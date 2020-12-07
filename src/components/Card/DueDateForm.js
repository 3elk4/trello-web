import React from "react";
import { Dropdown } from "react-bootstrap";

class DueDateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: new Date(props.currentDate).toISOString().split("T")[0],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  saveDate = (event) => {
    event.preventDefault();
    if (this.state.dueDate != null) {
      this.props.saveDate(this.state.dueDate);
    }
  };

  removeDate = () => {
    this.props.removeDate();
  };

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="primary">Due date</Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="px-3 py-2">
            <p className="p-0 m-0">Due date picker</p>
            <hr className="pt-0 mt-0" />
            <form onSubmit={this.saveDate}>
              <div className="form-group">
                <label htmlFor="datePicker">Pick a date: </label>
                <input
                  type="date"
                  id="datePicker"
                  name="dueDate"
                  value={this.state.dueDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.removeDate}
                >
                  Remove
                </button>
              </div>
            </form>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DueDateForm;
