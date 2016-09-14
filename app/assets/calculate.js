onmessage = function (e) {

  var months = e.data.months
    , lenders = e.data.lenders
    , requestId = e.data.requestId
    , interest = e.data.interest;

  var results = calculateResults(lenders, months, interest)
  postMessage({ requestId: requestId, results: results });
}

function calculateResults(lenders, months, interestRate) {
  if (!lenders.length) return [];

  interestRate = interestRate / 100.0 / 12.0; // yearly interest

  var totalAmountLoaned = lenders.reduce((amt, lender) => amt + lender.amount, 0);

  var ratios = lenders.map(l => ({ name: l.name, ratio: l.amount / totalAmountLoaned }));

  return [...Array(months)]
    .map(_ => {
      var periodPayment = (interestRate / (1 - Math.pow(1 + interestRate, -months))) * totalAmountLoaned;

      return {
        total: periodPayment,
        breakdown: ratios.map(r => ({ name: r.name, amount: periodPayment * r.ratio }))
      }
    })
};