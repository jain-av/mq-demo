from math_operations import multiply


def test_multiply_positive_numbers():
    assert multiply(2, 3) == 6


def test_multiply_by_zero():
    assert multiply(0, 5) == 0
    assert multiply(5, 0) == 0


def test_multiply_negatives():
    assert multiply(-2, -3) == 6
    assert multiply(-2, 3) == -6
