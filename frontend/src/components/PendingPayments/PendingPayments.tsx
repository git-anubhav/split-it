import { Table } from "react-bootstrap";
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
      setItemsList(getRoundedData(res.data));
    });
    axios.get("http://localhost:3001/all-friends").then((res) => {
      setFriendList(res.data);
    });
  }, []);

  const getRoundedData = (data: any) => {
    let roundedList = data;
    for (let i = 0; i < roundedList.length; i++) {
      roundedList[i].amount = 0;
    }
    for (let i = 0; i < roundedList.length; i++) {
      for (let j = 0; j < roundedList[i].paidFor.length; j++) {
        roundedList[i].amount += roundedList[i].paidFor[j].amount;
      }
    }
    console.log(roundedList);
    return roundedList;
  };

  useEffect(() => {
    if (itemsList.length > 0 && friendList.length > 0) {
      getSimplifiedDebt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <td className="primary-info">
                {debt.taker} Owes {debt.giver}
              </td>
              <td className="primary-info">Rs.{debt.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default PendingPayments;
