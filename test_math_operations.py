import pytest
from math_operations import add, clamp

def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative_numbers():
    assert add(-1, -1) == -2

def test_add_mixed_numbers():
    assert add(-5, 10) == 5

def test_add_zero():
    assert add(0, 5) == 5
    assert add(5, 0) == 5

def test_add_floats():
    assert add(2.5, 3.7) == 6.0


def test_clamp_inside_range():
    assert clamp(5, 0, 10) == 5


def test_clamp_below_range():
    assert clamp(-3, 0, 10) == 0


def test_clamp_above_range():
    assert clamp(42, 0, 10) == 10


def test_clamp_at_the_bounds():
    assert clamp(0, 0, 10) == 0
    assert clamp(10, 0, 10) == 10


def test_clamp_rejects_an_empty_range():
    with pytest.raises(ValueError, match="empty range"):
        clamp(5, 10, 0)
