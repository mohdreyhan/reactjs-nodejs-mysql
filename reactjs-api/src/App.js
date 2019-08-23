import React, { Component } from "react";
import { Table, Modal, Button, Container } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      items: [],
      modal: false,
      recordToUpdate: {
        Invoices_Id: "",
        Invoices_Company: "",
        Invoice_Cost: ""
      },
      messageFromServer: ""
    };
    this.state = this.initialstate;
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/posts")
      .then(res => res.json())
      .then(itemsFetched => {
        this.setState({
          items: itemsFetched
        });
      });
  };

  componentWillUpdate = () => {
    fetch("http://localhost:3000/posts")
      .then(res => res.json())
      .then(itemsFetched => {
        this.setState({
          items: itemsFetched
        });
      });
  };

  editData = row => {
    this.setState({
      modal: !this.state.modal,
      recordToUpdate: row
    });
  };

  update = event => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      recordToUpdate: {
        // object that we want to update
        ...prevState.recordToUpdate, // keep all other key-value pairs
        [name]: value // update the value of specific key
      }
    }));
  };

  postRecord = () => {
    const recordToUpdate = this.state.recordToUpdate;
    fetch("http://localhost:3000/updateposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recordToUpdate)
    })
      .then(response => response.json())
      .then(res => {
        console.log(
          "record updated successfully :: ",
          res.message,
          " , record is :: ",
          res.recordUpdated
        );
        this.setState({
          messageFromServer: res.message
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          messageFromServer: error
        });
      });
  };

  render() {
    return (
      <Container>
        <div style={{ paddingTop: 20 }}>
          <div style={{ boxShadow: "2px 2px 2px grey" }}>
            <Table striped bordered hover size="sm" responsive="sm">
              <TableHeader />
              <TableBody
                characterData={this.state.items}
                editData={this.editData}
              />
            </Table>
            <Modal show={this.state.modal}>
              <Modal.Header>
                <Modal.Title>Invoice Data</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Invoice ID : {this.state.recordToUpdate.Invoices_Id}
                <br />
                <br />
                Invoices Company :
                <input
                  type="text"
                  placeholder={this.state.recordToUpdate.Invoices_Company}
                  name="Invoices_Company"
                  onChange={this.update}
                />
                <br />
                <br />
                Invoice Date :
                <input
                  type="text"
                  placeholder={this.state.recordToUpdate.Invoices_Date}
                  name="Invoices_Date"
                  onChange={this.update}
                />
                <br />
                <br />
                Invoice Cost :
                <input
                  type="text"
                  placeholder={this.state.recordToUpdate.Invoices_Cost}
                  name="Invoices_Cost"
                  onChange={this.update}
                />
                <br />
                <br />
                Invoice Discount :
                <input
                  type="text"
                  placeholder={this.state.recordToUpdate.Invoices_Discount}
                  name="Invoices_Discount"
                  onChange={this.update}
                />
                <br />
                <br />
                <Button variant="primary" type="submit" onClick={this.editData}>
                  Close
                </Button>
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="primary"
                  type="submit"
                  onClick={this.postRecord}
                >
                  Save Changes
                </Button>
                <div style = {{paddingTop : "15px"}}>{this.state.messageFromServer}</div>
              </Modal.Body>
              <Modal.Footer />
            </Modal>
          </div>
        </div>
      </Container>
    );
  }
}

export default App;

const TableBody = props => {
  const rows = props.characterData.map(row => {
    return (
      <tr key={row.Invoices_Id} style={{ cursor: "pointer" }}>
        <td>{row.Invoices_Id}</td>
        <td>{row.Invoices_Company}</td>
        <td>{row.Invoices_Date}</td>
        <td>{row.Invoices_Cost}</td>
        <td>{row.Invoices_Discount}</td>
        <td>
          <Button type="button" onClick={() => props.editData(row)}>
            Edit
          </Button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const TableHeader = () => {
  return (
    <thead style={{ backgroundColor: "#1890ff", color: "white" }}>
      <tr>
        <th>Invoice No</th>
        <th>Company</th>
        <th>Date</th>
        <th>Cost</th>
        <th>Dsicount</th>
        <th>Edit</th>
      </tr>
    </thead>
  );
};
