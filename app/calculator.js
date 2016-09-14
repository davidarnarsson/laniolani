
let reqId = 0;

const newId = () => (reqId++); 

const worker = new Worker('calculate.js')

const callbacks = {};

worker.onmessage = function (e) {
  const { requestId, results } = e.data;

  if (callbacks[requestId]) {
    callbacks[requestId](results);
  }
};

export default function calculate(lenders, months, interest) {

  return new Promise((resolve, reject) => {
    const payload = {
      requestId: newId(),
      lenders,
      months,
      interest: Math.max(0.00001, parseFloat(interest))
    };
    
    callbacks[payload.requestId] = resolve;
    worker.postMessage(payload);
  });
}  