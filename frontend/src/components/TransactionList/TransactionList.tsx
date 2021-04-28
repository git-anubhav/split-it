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

  const deleteTransaction = (_id:any): any =>{
    console.log("hi");
    
    console.log("_id",_id);
    
    // axios.delete(`http://localhost:3001/all-transactions/${_id}`)
    //   .then((res) => {
    //     console.log(res);
        
    //   })
    //   .catch((err) =>  console.log(err))
  }

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
            <th></th>
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
                <div className="primary-info">Rs.{item.amount.toFixed(2)}</div>
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
              <td className="text-align-right">
                <button type="button" buttonId={item._id}
                  //onClick={console.log(document.querySelector("tr")?.getAttribute("key"))} 
                  className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default TransactionList;
