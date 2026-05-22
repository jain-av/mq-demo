def test_lots_of_output():
    for i in range(200):
        print(
            f"DEBUG: processing widget {i} of 200 -- status=ok cache_hit=False ms=12"
        )
    assert "expected_value" == "actual_value_that_does_not_match"
