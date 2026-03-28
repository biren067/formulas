import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function IndustryCards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/nifty-fifty-data")
      .then((res) => res.text())
      .then((csvText) => {
        const result = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        console.log("Parsed Data:", result.data);
        const processed = processData(result.data);
        setData(processed);
      });
  }, []);

  const processData = (rows) => {
    console.log("Raw Data:", rows);
    const industryMap = {};

    rows.forEach((row) => {
      const industry = row.Industry;
      const weight = parseFloat(row.Weightage || 0);

      if (!industryMap[industry]) {
        industryMap[industry] = {
          name: industry,
          totalWeightage: 0,
          stocks: [],
        };
      }

      industryMap[industry].stocks.push({
        symbol: row.Symbol,
        weightage: weight,
      });

      industryMap[industry].totalWeightage += weight;
    });

    // Convert to array
    const industries = Object.values(industryMap);

    // Sort stocks inside each industry
    industries.forEach((ind) => {
      ind.stocks.sort((a, b) => b.weightage - a.weightage);
    });

    // Sort industries by total weightage
    industries.sort((a, b) => b.totalWeightage - a.totalWeightage);

    return industries;
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((industry, index) => (
        <div
          key={index}
          className="rounded-2xl p-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
        >
          <h2 className="text-xl font-bold">{industry.name}</h2>
          <p className="text-sm mb-3">
            Total: {industry.totalWeightage.toFixed(2)}
          </p>

          <div className="space-y-2">
            {industry.stocks.map((stock, i) => (
              <div
                key={i}
                className="flex justify-between bg-white/10 p-2 rounded-lg"
              >
                <span>{stock.symbol}</span>
                <span>{stock.weightage}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
