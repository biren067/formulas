import React, { useState } from "react";

export default function InvestmentPlan() {
  const [startMoney, setStartMoney] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [rate, setRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [data, setData] = useState([]);
  const [yearlyInvestment, setYearlyInvestment] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleCalculate = () => {
    const result = [];
    let principal = startMoney;
    const r = rate / 100; // convert to decimal
    const years = Math.ceil(months / 12);

    for (let year = 1; year <= years; year++) {
      const yearlyInvestment = monthly * 12;
      const interest = principal * r;
      const amount = principal + interest + yearlyInvestment;

      result.push({
        id: year,
        yearlyInvestment: yearlyInvestment.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        amount: amount.toFixed(2),
      });
        setYearlyInvestment((prev)=>prev+yearlyInvestment)
        setInterestAmount((prev)=>prev+interest)

      principal = amount; // next year's principal
    }

    setData(result);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Market Investment Plan</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Start Money</label>
          <input
            type="number"
            value={startMoney}
            onChange={(e) => setStartMoney(Number(e.target.value))}
            className="border rounded p-2 w-full"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Monthly Investment</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="border rounded p-2 w-full"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rate of Interest (Annual %)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="border rounded p-2 w-full"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Number of Months</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="border rounded p-2 w-full"
            placeholder="0"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Calculate
      </button>

      {data.length > 0 && (
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S.No</th>
                <th className="border p-2">Yearly Investment</th>
                <th className="border p-2">Principal</th>
                <th className="border p-2">Interest Earned</th>
                <th className="border p-2">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id} className="text-center">
                  <td className="border p-2">{row.id}</td>
                  <td className="border p-2">₹{row.yearlyInvestment}</td>
                  <td className="border p-2">₹{row.principal}</td>
                  <td className="border p-2">₹{row.interest}</td>
                  <td className="border p-2 font-semibold">₹{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
       {data.length > 0 &&(
        <div class="flex flex-col justify-center items-start gap-2 mt-5">
  <div><strong>Total Investment  </strong>{Math.round(yearlyInvestment).toLocaleString("en-IN")}</div>
  <div><strong>Interest Earned   </strong>{Math.round(interestAmount).toLocaleString("en-IN")}</div> 
  <div><strong>Net  </strong>{Math.round(yearlyInvestment + interestAmount).toLocaleString("en-IN")}</div> 
            </div>
        

       )}
    </div>
  );
}
