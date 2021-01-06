import { Dropdown, DropdownButton } from "react-bootstrap";

const ListActions = (props) => {
  return (
    <>
      <DropdownButton
        title=""
        variant="dark"
        id="list_actions_dropdown"
        size="sm"
      >
        <Dropdown.Item onClick={() => props.showBoardListModal()}>
          Move
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.archiveList(props.listId)}>
          Archive list...
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default ListActions;
