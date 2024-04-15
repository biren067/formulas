import React, { useState } from 'react';

function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEMI] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [emiData, setEMIData] = useState([]);

  const calculateEMI = () => {
    const P = parseInt(principal);
    const r = parseFloat(interestRate) / (12 * 100); // Monthly interest rate
    const n = parseInt(tenure); // Total number of payments (in months)

    const EMI = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    setEMI(EMI);

    const totalInterest = Math.round(EMI * n - P);
    setTotalInterest(totalInterest);

    const totalPayment = P + totalInterest;
    setTotalPayment(totalPayment);

    const emiTableData = [];
    let outstandingPrincipal = P;

    for (let i = 1; i <= n; i++) {
      const interest = Math.round(outstandingPrincipal * r);
      const principalForMonth = EMI - interest;
      emiTableData.push({
        no: i,
        principalForMonth: principalForMonth,
        interestPaidForMonth: interest,
        totalPayment: EMI,
        balance: outstandingPrincipal - principalForMonth
      });
      outstandingPrincipal -= principalForMonth;
    }

    setEMIData(emiTableData);
  };

  return (
    <div>
      <h2>EMI Calculator</h2>
      <div>
        <label>
          Principal Amount:
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Interest Rate (% per annum):
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Tenure (months):
          <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} />
        </label>
      </div>
      <button onClick={calculateEMI}>Calculate EMI</button>

      {emi !== '' && totalInterest !== '' && totalPayment !== '' && (
        <div>
          <p>EMI: {emi}</p>
          <p>Total Interest Payable: {totalInterest}</p>
          <p>Total Payment: {totalPayment}</p>
        </div>
      )}

      {emiData.length > 0 && (
        <table style={{ borderCollapse: 'collapse', border: '1px solid black', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>No</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Principal for the month</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Interest paid for the month</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Total payment</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {emiData.map(row => (
              <tr key={row.no}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{row.no}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{row.principalForMonth}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{row.interestPaidForMonth}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{row.totalPayment}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EMICalculator;
