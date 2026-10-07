import time


def wait_for(condition, timeout, interval=0.1):
    """Poll until the condition returns something truthy, or give up."""
    deadline = time.monotonic() + timeout
    polls = 0
    last = None
    while time.monotonic() < deadline:
        polls += 1
        last = condition()
        if last:
            return last
        time.sleep(interval)
    raise TimeoutError(
        f"condition not met after {timeout}s "
        f"(polled {polls} times; last result: {last!r})"
    )
