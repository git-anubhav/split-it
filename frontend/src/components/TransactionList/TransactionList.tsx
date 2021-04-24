import { Table } from "react-bootstrap";
import { Fragment } from "react";
import "./style.scss";

const TransactionList: React.FC = () => {
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
            <th>Transactions</th>
            <th>Amount</th>
          </tr>
        </thead>
      </Table>
    </Fragment>
  );
};

export default TransactionList;
