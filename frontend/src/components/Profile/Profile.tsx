import { Fragment, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import "./style.scss";
import axios from "axios";

interface ItemsInterface {
  _id: String;
  title: String;
  amount: number;
  paidBy: String;
  date: Date;
  paidFor: Array<PaidForInterface>;
  _v: number;
}

interface PaidForInterface {
  _id: String;
  name: String;
  amount: number;
}
interface FriendInterface {
  _id: String;
  name: String;
  _v: number;
}

const Profile: React.FC = () => {
  const [itemsList, setItemsList] = useState<Array<ItemsInterface>>([]);
  const [friendList, setFriendList] = useState<Array<FriendInterface>>([]);
  const [user, setUser] = useState("");
  const [groupTotal, setGroupTotal] = useState(0);
  const [selfTotal, setSelfTotal] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/all-transactions").then((res) => {
      setItemsList(res.data);
    });
    axios.get("http://localhost:3001/all-friends").then((res) => {
      setFriendList(res.data);
    });
  }, []);

  useEffect(() => {
    setGroupTotal(findGroupTotal(itemsList));
    setSelfTotal(findSelfTotal(itemsList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsList, user]);

  const findGroupTotal = (arr: any[]) => {
    let tempGroupTotal = 0;
    for (let i = 0; i < arr.length; i++) {
      tempGroupTotal += arr[i].amount;
    }
    return tempGroupTotal;
  };

  const findSelfTotal = (arr: any[]) => {
    let tempSelfTotal = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].paidFor.length; j++) {
        if (arr[i].paidFor[j].name === user) {
          tempSelfTotal += arr[i].paidFor[j].amount;
        }
      }
    }
    return tempSelfTotal;
  };

  const handleUserSelect = (key: any) => {
    setUser(key);
  };

  return (
    <Fragment>
      <div className="profile-container">
        <div>
          <img
            src="/images/profile-picture.jpeg"
            alt=""
            className="profile-picture"
          />
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {user === "" ? "Select User" : user}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {friendList.map((friend: any, index) => (
              <Dropdown.Item
                key={friend._id}
                eventKey={friend.name}
                onSelect={handleUserSelect}
              >
                {friend.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="total-expense-details">
          <div>
            <div>My Total</div>
            <div>Rs.{selfTotal}</div>
          </div>
          <div className="group-total">
            <div>Group Total</div>
            <div>Rs.{groupTotal}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
