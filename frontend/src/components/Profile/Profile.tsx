import { Fragment } from "react";
import "./style.scss";

const Profile: React.FC = () => {
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
        <div>My Name</div>
        <div className="total-expense-details">
          <div>
            <div>My Total</div>
            <div>Rs.21678</div>
          </div>
          <div className="group-total">
            <div>Group Total</div>
            <div>Rs.21678</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
