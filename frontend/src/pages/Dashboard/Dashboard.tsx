import { Fragment, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import TransactionList from "../../components/TransactionList/TransactionList";
import Profile from "../../components/Profile/Profile";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import AddFriendForm from "../../components/AddFriendForm/AddFriendForm";
import PendingPayments from "../../components/PendingPayments/PendingPayments";
import "./style.scss";

const Dashboard: React.FC = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState("");
  const [componentToggle, setComponentToggle] = useState(true);

  const handleClose = () => setShow(false);

  const handleShow = (e: any) => {
    setShow(true);
    e.target.name === "add_friend" ? setForm("Friend") : setForm("Transaction");
  };
  const handleComponentToggle = () => {
    setComponentToggle(!componentToggle);
  };

  return (
    <Fragment>
      <div className="dashboard-container">
        <div className="dashboard-components">
          {componentToggle ? <TransactionList /> : <PendingPayments />}
        </div>
        <div className="dashboard-components profile-section">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Show Pending Payments"
            onChange={handleComponentToggle}
          />
          <Profile />
          <Button name="add_transaction" onClick={handleShow}>
            + Add Transaction
          </Button>
          <Button
            name="add_friend"
            onClick={handleShow}
            style={{ marginTop: "10px" }}
          >
            + Add Friend
          </Button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {form}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form === "Transaction" ? <AddTransactionForm /> : <AddFriendForm />}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Dashboard;
