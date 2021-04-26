import { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TransactionList from "../../components/TransactionList/TransactionList";
import Profile from "../../components/Profile/Profile";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import AddFriendForm from "../../components/AddFriendForm/AddFriendForm";
import "./style.scss";

const Dashboard: React.FC = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    setShow(true);
    e.target.name === "add_friend" ? setForm("Friend") : setForm("Transaction");
  };
  return (
    <Fragment>
      <div className="dashboard-container">
        <div className="dashboard-components">
          <TransactionList />
        </div>
        <div className="dashboard-components profile-section">
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
