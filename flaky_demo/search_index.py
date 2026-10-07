"""A small in-memory document index with an asynchronous refresh.

Writes land in a staging buffer and only become queryable once a refresh
promotes them, so a reader can observe a generation older than its own write.
"""

import logging
import time

logger = logging.getLogger("search.index")

_FIRST_GENERATION = 41


class SearchIndex:
    def __init__(self, refresh_interval: float) -> None:
        self._refresh_interval = refresh_interval
        self._committed: dict[str, dict] = {}
        self._staged: list[tuple[float, dict]] = []
        self.generation = _FIRST_GENERATION
        self._warned_generation: int | None = None

    def add(self, doc: dict) -> str:
        self._staged.append((time.monotonic() + self._refresh_interval, doc))
        self.generation += 1
        return doc["id"]

    def query(self, term: str) -> list[str]:
        self._promote_ready()
        served = self.generation - len(self._staged)
        if self._staged and self._warned_generation != served:
            self._warned_generation = served
            logger.warning(
                "query served from generation %d, document committed at generation %d",
                served,
                self.generation,
            )
        return sorted(
            doc_id
            for doc_id, doc in self._committed.items()
            if term.lower() in doc["title"].lower()
        )

    def document_count(self) -> int:
        self._promote_ready()
        return len(self._committed)

    def _promote_ready(self) -> None:
        now = time.monotonic()
        for visible_at, doc in self._staged:
            if visible_at <= now:
                self._committed[doc["id"]] = doc
        self._staged = [item for item in self._staged if item[0] > now]
