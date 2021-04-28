function getMin(arr) {
  let minIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}

function getMax(arr) {
  let minIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}

export function minCashFlow(net_worth, friends, debts) {
  let maxCredit = getMax(net_worth),
    mxDebit = getMin(net_worth);

  if (net_worth[maxCredit] === 0 && net_worth[mxDebit] === 0) {
    return debts;
  }

  let min = Math.min(-net_worth[mxDebit], net_worth[maxCredit]);
  net_worth[maxCredit] -= min;
  net_worth[mxDebit] += min;

  net_worth[maxCredit] = parseFloat(
    parseFloat(net_worth[maxCredit]).toFixed(2)
  );
  net_worth[mxDebit] = parseFloat(parseFloat(net_worth[mxDebit]).toFixed(2));

  debts.push({
    taker: friends[mxDebit].name,
    giver: friends[maxCredit].name,
    amount: min,
  });

  minCashFlow(net_worth, friends, debts);
}
