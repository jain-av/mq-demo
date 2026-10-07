import pytest

from search_index import SearchIndex


@pytest.fixture
def index():
    return SearchIndex(refresh_interval=0.0)


@pytest.mark.parametrize(
    "term",
    ["quarterly", "QUARTERLY", "Quarterly", " quarterly", "quarterly "],
)
def test_term_normalization_finds_the_document(index, term):
    index.add({"id": "doc-4812", "title": "Quarterly revenue summary"})
    assert index.query(term.strip()) == ["doc-4812"]


@pytest.mark.parametrize("term", ["", "  "])
def test_blank_term_matches_everything(index, term):
    index.add({"id": "doc-4812", "title": "Quarterly revenue summary"})
    assert index.query(term.strip()) == ["doc-4812"]


def test_unknown_term_matches_nothing(index):
    index.add({"id": "doc-4812", "title": "Quarterly revenue summary"})
    assert index.query("margins") == []


def test_partial_word_matches(index):
    index.add({"id": "doc-4812", "title": "Quarterly revenue summary"})
    assert index.query("rev") == ["doc-4812"]


def test_results_are_sorted_by_id(index):
    index.add({"id": "doc-4899", "title": "Quarterly notes"})
    index.add({"id": "doc-4812", "title": "Quarterly revenue summary"})
    assert index.query("quarterly") == ["doc-4812", "doc-4899"]
