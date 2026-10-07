from wait_helpers import wait_for

REVENUE_DOC = {"id": "doc-4812", "title": "Quarterly revenue summary"}
ROADMAP_DOC = {"id": "doc-4813", "title": "Roadmap for the next quarter"}


def test_add_returns_the_document_id(index):
    assert index.add(REVENUE_DOC) == "doc-4812"


def test_add_advances_the_generation(index):
    before = index.generation
    index.add(REVENUE_DOC)
    assert index.generation == before + 1


def test_empty_index_matches_nothing(index):
    assert index.query("quarterly") == []


def test_search_reflects_new_document(lagging_index):
    doc_id = lagging_index.add(REVENUE_DOC)
    hits = wait_for(lambda: lagging_index.query("quarterly"), timeout=5.0)
    assert hits == [doc_id]


def test_search_is_case_insensitive(index):
    index.add(REVENUE_DOC)
    assert index.query("QUARTERLY") == ["doc-4812"]


def test_search_matches_every_document_with_the_term(index):
    index.add(REVENUE_DOC)
    index.add(ROADMAP_DOC)
    assert index.query("quarter") == ["doc-4812", "doc-4813"]


def test_search_ignores_documents_without_the_term(index):
    index.add(REVENUE_DOC)
    index.add(ROADMAP_DOC)
    assert index.query("revenue") == ["doc-4812"]


def test_document_count_counts_committed_documents(index):
    index.add(REVENUE_DOC)
    index.add(ROADMAP_DOC)
    assert index.document_count() == 2


def test_re_adding_a_document_does_not_duplicate_it(index):
    index.add(REVENUE_DOC)
    index.add(REVENUE_DOC)
    assert index.document_count() == 1
