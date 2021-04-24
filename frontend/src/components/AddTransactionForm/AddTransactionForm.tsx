import { Fragment, useState } from "react";
import "./style.scss";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddTransactionForm: React.FC = () => {
  const [formState, setFormState] = useState({
    title: "",
    amount: "",
    date: "",
    paidBy: "",
    paidFor: "",
  });

  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:3001/add", formState);
  };
  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={formState.title}
            name="title"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Amount"
            name="amount"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Date"
            name="date"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Paid By</Form.Label>
          <Form.Control
            type="text"
            placeholder="Paid By"
            name="paidBy"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Paid For</Form.Label>
          <Form.Control
            type="text"
            placeholder="Paid For"
            name="paidFor"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddTransactionForm;
