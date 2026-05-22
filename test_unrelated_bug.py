import json


def test_parses_user_input():
    payload = '{"id": 42, "name": "test"'
    parsed = json.loads(payload)
    assert parsed["id"] == 42
