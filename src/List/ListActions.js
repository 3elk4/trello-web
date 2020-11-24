import { Dropdown, DropdownButton } from "react-bootstrap";

const ListActions = (props) => {
  return (
    <>
      <DropdownButton
        title=""
        variant="primary"
        id="list_actions_dropdown"
        size="sm"
      >
        <Dropdown.Item onClick={() => props.showBoardListModal()}>
          Move
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log("Archive")}>
          Archive list...
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log("Rename")}>
          Rename list...
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default ListActions;
