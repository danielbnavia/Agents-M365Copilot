from microsoft_agents_m365copilot.generated.models.call_records.user_identity import (
    UserIdentity as CallRecordsUserIdentity,
)
from microsoft_agents_m365copilot.generated.models.identity import Identity
from microsoft_agents_m365copilot.generated.models.user_identity import (
    UserIdentity as DefaultUserIdentity,
)


class _ChildNode:
    def __init__(self, value: str) -> None:
        self._value = value

    def get_str_value(self) -> str:
        return self._value


class _ParseNode:
    def __init__(self, odata_type: str) -> None:
        self._odata_type = odata_type

    def get_child_node(self, key: str) -> _ChildNode:
        assert key == "@odata.type"
        return _ChildNode(self._odata_type)


def test_identity_uses_call_records_user_identity_for_call_records_odata_type() -> None:
    model = Identity.create_from_discriminator_value(
        _ParseNode("#microsoft.graph.callRecords.userIdentity")
    )

    assert isinstance(model, CallRecordsUserIdentity)
    assert not isinstance(model, DefaultUserIdentity)


def test_identity_uses_default_user_identity_for_default_user_odata_type() -> None:
    model = Identity.create_from_discriminator_value(
        _ParseNode("#microsoft.graph.userIdentity")
    )

    assert isinstance(model, DefaultUserIdentity)
