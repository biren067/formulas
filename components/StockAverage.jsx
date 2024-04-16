// import React, { useState } from 'react';
// // import './InvestmentCalculator.css'; // Importing CSS file for styling
// import '../styles/stockaverage.module.css'

// function StockAverage() {
//   const [stockPrice1, setStockPrice1] = useState('');
//   const [noOfStock1, setNoOfStock1] = useState('');
//   const [stockPrice2, setStockPrice2] = useState('');
//   const [noOfStock2, setNoOfStock2] = useState('');
//   const [totalInvestment, setTotalInvestment] = useState('');
//   const [initialInvestment, setInitialInvestment] = useState('');
//   const [newInvestment, setNewInvestment] = useState('');
//   const [newAvg, setNewAvg] = useState('');

//   const calculateInvestments = () => {
//     const initialInvestment = stockPrice1 * noOfStock1;
//     setInitialInvestment(initialInvestment.toFixed(2));

//     const newInvestment = stockPrice2 * noOfStock2;
//     setNewInvestment(newInvestment.toFixed(2));

//     const totalInvestment = parseFloat(initialInvestment) + parseFloat(newInvestment);
//     setTotalInvestment(totalInvestment.toFixed(2));

//     const totalNoOfStocks = parseFloat(noOfStock1) + parseFloat(noOfStock2);
//     const newAvg = totalInvestment / totalNoOfStocks;
//     setNewAvg(newAvg.toFixed(2));
//   }

//   return (
//     <div className="calculator">
//       <h1>Investment Calculator</h1>
//       <div className="section">
//         <h2>For Initial Investment:</h2>
//         <label className='label-input'>
//           Stock Price:
//           <input className='input-text' type="number" value={stockPrice1} onChange={(e) => setStockPrice1(e.target.value)} />
//         </label><br />
//         <label  className='label-input'>
//           No of Stock:
//           <input className='input-text' type="number" value={noOfStock1} onChange={(e) => setNoOfStock1(e.target.value)} />
//         </label>
//       </div>
//       <div className="section">
//         <h2>For New Investment:</h2>
//         <label  className='label-input'>
//           Stock Price:
//           <input className='input-text' type="number" value={stockPrice2} onChange={(e) => setStockPrice2(e.target.value)} />
//         </label><br />
//         <label className='label-input'>
//           No of Stock:
//           <input  className='input-text' type="number" value={noOfStock2} onChange={(e) => setNoOfStock2(e.target.value)} />
//         </label>
//       </div>
//       <button onClick={calculateInvestments}>Calculate</button>
//       {initialInvestment && <div>Initial Invested Amount: {initialInvestment}</div>}
//       {newInvestment && <div>New Invested Amount: {newInvestment}</div>}
//       {totalInvestment && <div>Total Investment: {totalInvestment}</div>}
//       {newAvg && <div>New Avg: {newAvg}</div>}
//     </div>
//   );
// }

// export default StockAverage;





import React, { useState } from 'react';

function StockAverage() {
  const [stockPrice1, setStockPrice1] = useState('');
  const [noOfStock1, setNoOfStock1] = useState('');
  const [stockPrice2, setStockPrice2] = useState('');
  const [noOfStock2, setNoOfStock2] = useState('');
  const [finalNoOfStock, setFinalNoOfStock] = useState('');
  const [totalInvestment, setTotalInvestment] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [newInvestment, setNewInvestment] = useState('');
  const [newAvg, setNewAvg] = useState('');

  const initialInvestedAmount = ()=>{
    const initialInvestment = stockPrice1 * noOfStock1;
    setInitialInvestment(initialInvestment.toFixed(2));
  }

  const NextInvestedAmount = ()=>{
    const newInvestment = stockPrice2 * noOfStock2;
    setNewInvestment(newInvestment.toFixed(2));
  }

  const calculateInvestments = () => {
    const totalInvestment = parseFloat(initialInvestment) + parseFloat(newInvestment);
    setTotalInvestment(totalInvestment.toFixed(2));
    const totalNoOfStocks = parseFloat(noOfStock1) + parseFloat(noOfStock2);
    const newAvg = totalInvestment / totalNoOfStocks;
    setNewAvg(newAvg.toFixed(2));
    setFinalNoOfStock(totalNoOfStocks.toFixed(2))
  }

  return (
    <div className='flex-col items-center m-3 px-3 '>
      <h1 className='text-center'>Investment Calculator</h1>
      <h2>For Initial Investment:</h2>
      <div>
        <label>
            Stock Price:
            <input type="number" value={stockPrice1} onChange={(e) => setStockPrice1(e.target.value)} />
        </label>
        <label>
            No of Stock:
            <input onKeyUp={initialInvestedAmount} type="number" value={noOfStock1} onChange={(e) => setNoOfStock1(e.target.value)} />
        </label>
        {initialInvestment && <div>Initial Invested Amount: {initialInvestment}</div>}
      </div>
      <div>
        <h2>For New Investment:</h2>
        <label>
            Stock Price:
            <input  type="number" value={stockPrice2} onChange={(e) => setStockPrice2(e.target.value)} />
        </label>
        <label>
            No of Stock:
            <input onKeyUp={NextInvestedAmount} type="number" value={noOfStock2} onChange={(e) => setNoOfStock2(e.target.value)} />
        </label><br />
        {newInvestment && <div>New Invested Amount: {newInvestment}</div>}
      </div>
          <button onClick={calculateInvestments}>Calculate</button>
          {finalNoOfStock && <div>No of Stock: {finalNoOfStock}</div>}
            {totalInvestment && <div>Total Investment: {totalInvestment}</div>}
            {newAvg && <div>New Avg: {newAvg}</div>}
    </div>
  );
}

export default StockAverage;
