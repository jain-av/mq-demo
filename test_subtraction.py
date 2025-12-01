import pytest
from math_operations import subtract

@pytest.mark.parametrize("a, b, expected", [
    (5, 3, 2),
    (10, 5, 5),
    (-1, -1, 0),
    (-5, 10, -15),
    (0, 5, -5),
    (5, 0, 5),
    (10.5, 3.2, 7.3),
    (100, 50, 50),
])
def test_subtract(a, b, expected):
    assert subtract(a, b) == expected

def test_subtract_same_numbers():
    """Test that subtracting a number from itself equals zero."""
    assert subtract(42, 42) == 0
    assert subtract(-10, -10) == 0

def test_subtract_negative_result():
    """Test subtraction that results in negative numbers."""
    assert subtract(3, 5) == -2
    assert subtract(0, 10) == -10
