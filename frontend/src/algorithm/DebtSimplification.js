export function minCashFlow(net_worth, friends, debts) {
  let maxCredit = net_worth.indexOf(Math.max(...net_worth)),
    mxDebit = net_worth.indexOf(Math.min(...net_worth));

  if (net_worth[maxCredit] === 0 && net_worth[mxDebit] === 0) {
    return debts;
  }

  let min = Math.min(-net_worth[mxDebit], net_worth[maxCredit]);
  net_worth[maxCredit] -= min;
  net_worth[mxDebit] += min;

  debts.push({
    taker: friends[mxDebit].name,
    giver: friends[maxCredit].name,
    amount: min,
  });

  minCashFlow(net_worth, friends, debts);
}
