import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ol className="">
    <li>Re-Invest Calculation: Investing money continously 
      <button className="button">
        <Link href='/page/reinvest'>Calculate</Link>
      </button>
    </li>
    
    <li>Age calculation: Calculate Age of a Person 
      <button className="button">
        <Link href='/page/agecalculator'>Calculate</Link>
      </button>
    </li>

    <li>SIP (Systematic Investment Plan) calculation </li>
    <li>Currency converter </li>
    <li>Mortgage calculator </li>
    <li>BMI (Body Mass Index) calculator </li>
    <li>Percentage calculator </li>
    <li>GPA (Grade Point Average) </li>
    <li>Tip calculator </li>
    <li>Retirement savings calculator </li>
    <li>Loan repayment calculator </li>
    <li>Tax calculator </li>
    <li>Interest rate calculator </li>
    <li>Distance calculator </li>
    <li>Time zone converter </li>
    <li>Fuel cost calculator </li>
    <li>Square footage calculator </li>
    <li>Volume calculator </li>
    <li>Area calculator </li>
    <li>Factorial calculator </li>
    <li>Quadratic equation solver </li>
    <li>Exponential calculator </li>
    <li>Prime number calculator </li>
    <li>Binary/Hexadecimal/Decimal converter </li>
    <li>LCM (Least Common Multiple) </li>
    <li>GCD (Greatest Common Divisor) </li>
    <li>Statistics calculator </li>
    <li>Angle calculator </li>
    <li>Discount calculator </li>
    <li>Perimeter calculator </li>
    <li>Time duration calculator </li>
    <li>Salary Calculator</li>
</ol>
 
      </main>
  );
}
