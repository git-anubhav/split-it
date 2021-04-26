import { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddFriendForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
  });

  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:3001/add-friend", formState);
  };

  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={formState.name}
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddFriendForm;
