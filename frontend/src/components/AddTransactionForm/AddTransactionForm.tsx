import { Fragment, useState, useEffect } from "react";
import "./style.scss";
import { Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-date-picker";

interface FormStateInterface {
  title: string;
  amount: number;
  date: Date;
  paidBy: string;
  paidFor: any[];
}

const AddTransactionForm: React.FC = () => {
  const [formState, setFormState] = useState<FormStateInterface>({
    title: "",
    amount: 0,
    date: new Date(),
    paidBy: "",
    paidFor: [],
  });
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/all-friends").then((res) => {
      setFriendList(res.data);
    });
  }, []);

  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormState({
      ...formState,
      date: date,
    });
  };

  const handleFriendSelect = (key: any) => {
    setFormState({
      ...formState,
      paidBy: key,
    });
  };

  const handlePaidFor = (e: any) => {
    let checkedFriends = formState.paidFor;
    let split: number = formState.amount
      ? formState.amount / (checkedFriends.length + 1)
      : 0;
    for (let i = 0; i < checkedFriends.length; i++) {
      checkedFriends[i].amount = split;
    }
    if (e.target.checked === true) {
      checkedFriends.push({ name: e.target.value, amount: split });
      setFormState({
        ...formState,
        paidFor: checkedFriends,
      });
    } else {
      const index = checkedFriends.findIndex(
        (obj) => obj.name === e.target.value
      );
      checkedFriends.splice(index, 1);
      setFormState({
        ...formState,
        paidFor: checkedFriends,
      });
      split = formState.amount ? formState.amount / checkedFriends.length : 0;
      for (let i = 0; i < checkedFriends.length; i++) {
        checkedFriends[i].amount = split;
      }
    }
  };

  const getCheckboxIndex = (name: any) => {
    return formState.paidFor[
      formState.paidFor.findIndex((borrower) => {
        return borrower.name === name;
      })
    ];
  };

  const handleSubmit = (e: any) => {
    let roundedFormState = formState;
    roundedFormState.amount = 0;
    for (let i = 0; i < formState.paidFor.length; i++) {
      roundedFormState.amount += parseFloat(
        formState.paidFor[i].amount.toFixed(2)
      );
    }
    for (let i = 0; i < formState.paidFor.length; i++) {
      roundedFormState.paidFor[i].amount = roundedFormState.paidFor[
        i
      ].amount.toFixed(2);
    }
    console.log(roundedFormState);
    axios.post("http://localhost:3001/add-transaction", roundedFormState);
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
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Amount"
            name="amount"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <br />
          <DatePicker
            className="date-picker"
            clearIcon={null}
            value={formState.date}
            format="d/M/yyyy"
            onChange={(date: any) => handleDateChange(date)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Paid By</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {formState.paidBy === "" ? "Select" : formState.paidBy}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {friendList.map((friend: any, index) => (
                <Dropdown.Item
                  key={friend._id}
                  eventKey={friend.name}
                  onSelect={handleFriendSelect}
                >
                  {friend.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Label>Paid For</Form.Label>
          {friendList.map((friend: any, index: number) => (
            <div key={friend._id} className="paid-for-checkboxes">
              <Form.Check
                value={friend.name}
                id={`${index}`}
                onChange={handlePaidFor}
                type="checkbox"
                label={friend.name}
              />
              <div>
                Rs.
                {getCheckboxIndex(friend.name)
                  ? getCheckboxIndex(friend.name).amount.toFixed(2)
                  : 0}
              </div>
            </div>
          ))}
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddTransactionForm;
