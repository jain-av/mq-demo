def add(a, b):
    """Add two numbers together."""
    return a + b

def subtract(a, b):
    """Subtract b from a."""
    return a - b

def multiply(a, b):
    """Multiply two numbers."""
    return a * b

def divide(a, b):
    """Divide a by b."""
    return a / b
def clamp(value, low, high):
    """Constrain value to the inclusive range [low, high]."""
    if low > high:
        raise ValueError(f"empty range: [{low}, {high}]")
    return max(low, min(value, high))

def mean(values):
    """Arithmetic mean of a non-empty sequence."""
    if not values:
        raise ValueError("mean of an empty sequence")
    return sum(values) / len(values)
