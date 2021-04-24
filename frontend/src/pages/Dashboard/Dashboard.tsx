import { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TransactionList from "../../components/TransactionList/TransactionList";
import Profile from "../../components/Profile/Profile";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import "./style.scss";

const Dashboard: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div className="dashboard-container">
        <div className="dashboard-components">
          <TransactionList />
        </div>
        <div className="dashboard-components profile-section">
          <Profile />
          <Button onClick={handleShow}>+ Add Transaction</Button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTransactionForm />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Dashboard;
