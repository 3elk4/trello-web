import React from "react";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

class LabelsDropdown extends React.Component {
  handleClick = (labelId) => {
    if (
      this.props.actualCardLabels
        .map((label) => label.id)
        .find((element) => element === labelId)
    ) {
      this.props.unassignLabel(labelId);
    } else {
      this.props.assignLabel(labelId);
    }
  };

  render() {
    const menuItems = this.props.labels.map((labelInfo, index) => (
      <Dropdown.Item onClick={() => this.handleClick(labelInfo.id)} key={index}>
        {labelInfo.name}
      </Dropdown.Item>
    ));
    return (
      <DropdownButton
        as={ButtonGroup}
        variant="secondary"
        size="sm"
        title="Pick label"
      >
        {menuItems}
      </DropdownButton>
    );
  }
}

export default LabelsDropdown;
