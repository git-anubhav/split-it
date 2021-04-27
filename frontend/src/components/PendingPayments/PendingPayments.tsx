import { Table, Button } from "react-bootstrap";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { minCashFlow } from "../../algorithm/DebtSimplification";

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

const PendingPayments: React.FC = () => {
  const [itemsList, setItemsList] = useState<Array<ItemsInterface>>([]);
  const [friendList, setFriendList] = useState<Array<FriendInterface>>([]);
  const [debtList, setDebtList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/all-transactions").then((res) => {
      setItemsList(res.data);
    });
    axios.get("http://localhost:3001/all-friends").then((res) => {
      setFriendList(res.data);
    });
  }, []);

  useEffect(() => {
    if (itemsList.length > 0 && friendList.length > 0) {
      getSimplifiedDebt();
    }
  }, [itemsList, friendList]);

  const getSimplifiedDebt = () => {
    const netWorth = getNetWorthArray(new Array(friendList.length).fill(0));
    let debts: never[] = [];
    minCashFlow(netWorth, friendList, debts);
    setDebtList(debts);
  };

  const getNetWorthArray = (arr: Array<number>) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < itemsList.length; j++) {
        if (itemsList[j].paidBy === friendList[i].name) {
          arr[i] = arr[i] + itemsList[j].amount;
        }
        for (let k = 0; k < itemsList[j].paidFor.length; k++) {
          if (itemsList[j].paidFor[k].name === friendList[i].name) {
            arr[i] = arr[i] - itemsList[j].paidFor[k].amount;
          }
        }
      }
    }
    return arr;
  };

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
            <th colSpan={2}>PENDING PAYMENTS</th>
          </tr>
        </thead>
        <tbody>
          {debtList.map((debt: any, index: any) => (
            <tr key={index}>
              <td>
                {debt.taker} Owes {debt.giver}
              </td>
              <td>Rs.{debt.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default PendingPayments;
