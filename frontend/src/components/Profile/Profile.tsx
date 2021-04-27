import { Fragment, useState, useEffect } from "react";
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

const Profile: React.FC = () => {
  const [itemsList, setItemsList] = useState<Array<ItemsInterface>>([]);
  const [groupTotal, setGroupTotal] = useState(0);
  const [selfTotal, setSelfTotal] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/all-transactions").then((res) => {
      setItemsList(res.data);
    });
  }, []);

  useEffect(() => {
    setGroupTotal(findGroupTotal(itemsList));
    setSelfTotal(findSelfTotal(itemsList));
  }, [itemsList]);

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
        if (arr[i].paidFor[j].name === "Anubhav") {
          tempSelfTotal += arr[i].paidFor[j].amount;
        }
      }
    }
    return tempSelfTotal;
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
        <div>Anubhav</div>
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
