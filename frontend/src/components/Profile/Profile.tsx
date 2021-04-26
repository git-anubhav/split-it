import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

const Profile: React.FC = () => {
  const [itemsList, setItemsList] = useState([]);
  const [groupTotal, setGroupTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/all-transactions")
      .then((res) => {
        setItemsList(res.data);
      })
      .then((res) => {
        let tempGroupTotal = 0;
        itemsList.map((item: any) => (tempGroupTotal += item.amount));
        setGroupTotal(tempGroupTotal);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div>Rs.21678</div>
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
