
import React, { useState } from 'react';
import styles from '@/styles/reinvest.module.css'; // Import component-level CSS

function Index() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [tableData, setTableData] = useState([]);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState('years'); // Default selected duration is years
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [pageNumbers, setPageNumbers] = useState(1);
  const netPage = [];
  const maxPageButtons = 4;
  
  // Function to format principal amount with Indian numbering system
  const formatIndianNumber = (amount) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  const resetData = () => {
    setTableData([]);
    setCurrentPage(1);
  };

  const calculateCompoundInterest = () => {
    resetData();

    const P = parseFloat(principal.replace(/,/g, '')); // Remove commas before parsing
    const r = parseFloat(rate) / 100; // Convert rate to decimal
    let n;

    if (selectedDuration === 'years') {
      n = parseInt(years);
    } else {
      n = parseInt(months); // Convert months to years
    }

    if (isNaN(P) || isNaN(r) || isNaN(n)) {
      alert('Please enter valid values for principal, rate, and duration.');
      return;
    }

    const data = [];
    let lastAmount = P;
    for (let i = 1; i <= n; i++) {
      const A = lastAmount * Math.pow(1 + r, 1);
      const interestEarned = A - lastAmount;
      data.push({ duration: i, investedAmount: formatIndianNumber(lastAmount), interest: formatIndianNumber(interestEarned), amount: formatIndianNumber(A) });
      lastAmount = A;
    }
    setTableData(data);
    console.log("data Length::",data.length)
    let endPage = data.length/itemsPerPage
    for (let i = 1; i <= endPage; i++) {
      netPage.push(i);
    }
    console.log("data Length::",netPage)
    setPageNumbers(netPage);
    setCurrentPage(1); // Reset pagination to first page after calculating
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrincipalChange = (e) => {
    resetData();
    // Remove non-numeric characters and format with commas
    const formattedValue = formatIndianNumber(e.target.value.replace(/[^0-9]/g, ''));
    setPrincipal(formattedValue);
  };

  const handleDurationChange = (value) => {
    resetData();
    setSelectedDuration(value);
  };

  const setCustomRate = (e) => {
    resetData();
    setRate(e.target.value)
  };

  const setCustomYearsOrMonths = (e) => {
    resetData();
    if (selectedDuration==='years'){
      setYears(e.target.value)
    }else{
      setMonths(e.target.value)
    }
  };

  // const itemsPerPage = 10; // Define itemsPerPage here

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let lastAmountTitle = '';
  if (tableData.length > 0) {
    lastAmountTitle = tableData[tableData.length - 1].amount;
  }
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  
  let startPage = currentPage - Math.floor(maxPageButtons / 2);
  startPage = Math.max(startPage, 1);
  // const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
  // for (let i = startPage; i <= endPage; i++) {
  //   pageNumbers.push(i);
  // }
  return (
    <div className={styles.container}>
      <div className={styles['input-group']}>
        <label htmlFor="principal">Principal:</label>
        <input
          type="text"
          id="principal"
          value={principal}
          onChange={handlePrincipalChange}
        />
      </div>
      <div className={styles['input-group']}>
        <label htmlFor="rate">Rate of Interest (%):</label>
        <input
          type="number"
          id="rate"
          value={rate}
          onChange={setCustomRate}
        />
      </div>
      <div className={`flex ${styles['input-group']}`}>
        <label>Select Duration:</label>
        <div className='flex justify-space'>
          <div className='flex gap-1 mx-3'>
            <label htmlFor="years">Years</label>
            <input
              type="radio"
              id="years"
              name="duration"
              value="years"
              checked={selectedDuration === 'years'}
              onChange={() => handleDurationChange('years')}
            />
          </div>
          <div className='flex gap-1 mx-3'>
            <label htmlFor="months">Months</label>
            <input
              type="radio"
              id="months"
              name="duration"
              value="months"
              checked={selectedDuration === 'months'}
              onChange={() => handleDurationChange('months')}
            />
          </div>
        </div>
      </div>
      {selectedDuration === 'years' ? (
        <div className={styles['input-group']}>
          <label htmlFor="years">Number of Years:</label>
          <input
            type="number"
            id="years"
            value={years}
            // onChange={(e) => setYears(e.target.value)}
            onChange={setCustomYearsOrMonths}
          />
        </div>
      ) : (
        <div className={styles['input-group']}>
          <label htmlFor="months">Number of Months:</label>
          <input
            type="number"
            id="months"
            value={months}
            // onChange={(e) => setMonths(e.target.value)}
            onChange={setCustomYearsOrMonths}
          />
        </div>
      )}
      <button className={`button`} onClick={calculateCompoundInterest}>Calculate</button>
      
      {tableData.length > 0 && (
        <div className={styles['table-container']}>
          <div className='my-2'><label className='mx-2'>Final Amount</label><span className='text-white'>{lastAmountTitle}</span></div>
          <table>
            <thead>
              <tr>
                <th>{selectedDuration === 'years' ? 'Year' : 'Month'}</th>
                <th>Invested Amount</th>
                <th>Interest</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {tableData.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
              <tr key={item.duration}>
                <td>{item.duration}</td>
                <td>{item.investedAmount}</td>
                <td>{item.interest}</td>
                <td>{item.amount}</td>
              </tr>
            ))}

            </tbody>
          </table>


{/* Pagination controls */}
<div className={`${styles.mainPage__pagination}`}>
  <button
    className={`${styles.mainPage__button}`}
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {/* {currentPage > 4 && (
    <button className={` ${styles.mainPage__button_number}`}>{`...`}</button>
  )} */}

  {pageNumbers
    .filter(
      (pageNumber) =>
        pageNumber === currentPage ||
        pageNumber === currentPage - 1 ||
        pageNumber === currentPage + 1 ||
        pageNumber === currentPage + 2
    )
    .map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={` ${styles.mainPage__button_number} ${
          parseInt(pageNumber) === parseInt(currentPage)
            ? console.log("true")
            : console.log("false")
        }`}
      >
        {pageNumber}
      </button>
    ))}
{/* 
  {currentPage + 2 < totalPages && (
    <button className={` ${styles.mainPage__button_number}`}>{`...`}</button>
  )} */}

  <button
    className={`${styles.mainPage__button}`}
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={endIndex >= tableData.length}
  >
    Next
  </button>
</div>
{/* end of pagination */}

{/* Pagination controls */}
{/* <div className={`${styles.mainPage__pagination}`}>
        <button className={`${styles.mainPage__button}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button> 
        {currentPage >= 5 ?(<button      
            className={` ${styles.mainPage__button_number}`}
          >
            {`...`}
          </button>):(<></>) }
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}            
            className={` ${styles.mainPage__button_number} ${pageNumber=== currentPage ? 'bg-blue-500 border-blue-100' : 'text-blue'}`}
          >
            {pageNumber}
          </button>
        ))}
        <button className={`${styles.mainPage__button}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= tableData.length}
        >
          Next
        </button>
      </div> */}
      {/* end of pagination */}

          {/* <div className={styles.pagination}>
  <button
    className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
    disabled={currentPage === 1}
  >
    Prev
  </button>

  {Array.from({ length: Math.min(4, Math.ceil(tableData.length / itemsPerPage)) }).map((_, index) => {
    const pageNumber = index + 1;
    return (
      <button
        key={pageNumber}
        className={`${styles.button} ${currentPage === pageNumber ? styles.active : ''}`}
        onClick={() => setCurrentPage(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  })}

  <button
    className={`${styles.button} ${currentPage === Math.ceil(tableData.length / itemsPerPage) ? styles.disabled : ''}`}
    onClick={() => setCurrentPage((nextPage) => Math.min(nextPage + 1, Math.ceil(tableData.length / itemsPerPage)))}
    disabled={currentPage === Math.ceil(tableData.length / itemsPerPage)}
  >
    Next
  </button>
</div> */}



          {/* <div className={styles.pagination}>
            <button
              className={`${styles.button} mx-2`}
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index + 1}
                className={`${styles.button} ${currentPage === index + 1 ? styles.active : ''} mx-2`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`${styles.button} mx-2`}
              onClick={() => setCurrentPage((nextPage) => nextPage + 1)}
              disabled={indexOfLastItem >= tableData.length}
            >
              Next
            </button>
          </div> */}

        </div>
      )}
    </div>
  );
}

export default Index;

