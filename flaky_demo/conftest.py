import os

import pytest

from search_index import SearchIndex

# Only the queue's draft PR refreshes slowly, and only on its first attempt.
# Keyed on the attempt rather than on randomness so the flake is reproducible:
# one rerun always clears it. Failing on the author's own PR too would block it
# from ever being queued, since this check is required -- and a PR made green to
# get past that is then merged on its own result, so the queue never sees a
# failure to investigate.
_SLOW_REFRESH_SECONDS = 30.0


def _refresh_interval() -> float:
    on_draft = os.environ.get("HEAD_REF", "").startswith("mq-bot-")
    first_attempt = os.environ.get("RUN_ATTEMPT", "1") == "1"
    return _SLOW_REFRESH_SECONDS if on_draft and first_attempt else 0.0


@pytest.fixture
def index() -> SearchIndex:
    return SearchIndex(refresh_interval=0.0)


@pytest.fixture
def lagging_index() -> SearchIndex:
    """An index whose refresh runs behind the writer, as it does in staging."""
    return SearchIndex(refresh_interval=_refresh_interval())
