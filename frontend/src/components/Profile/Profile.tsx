import { Fragment } from "react";
import "./style.scss";

const Profile: React.FC = () => {
  // const [itemsList, setItemsList] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/all-transactions").then((res) => {
  //     setItemsList(res.data);
  //   });
  // }, []);

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
            <div>Rs.2165</div>
          </div>
          <div className="group-total">
            <div>Group Total</div>
            <div>Rs.2165</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
