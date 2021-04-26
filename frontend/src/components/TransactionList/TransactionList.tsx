import { Table } from "react-bootstrap";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

const TransactionList: React.FC = () => {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/all-transactions").then((res) => {
      setItemsList(res.data);
    });
  }, []);

  return (
    <Fragment>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="transaction-table"
      >
        <thead>
          <tr>
            <th>TRANSACTIONS</th>
            <th className="text-align-right">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {itemsList.map((item: any, index) => (
            <tr key={item._id}>
              <td>
                <div className="primary-info">{item.title}</div>
                <div className="secondary-info">Paid By: {item.paidBy}</div>
              </td>
              <td className="text-align-right">
                <div className="primary-info">Rs.{item.amount}</div>
                <div className="secondary-info">
                  {item.date
                    ? item.date
                        .replace(/T.*/, "")
                        .split("-")
                        .reverse()
                        .join("/")
                    : ""}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default TransactionList;
