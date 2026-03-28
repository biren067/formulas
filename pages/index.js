import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <>
      {/* <Calculator/> */}
      {/* <div className="flex flex-col justify-center items-start m-2 px-2 gap-3"> */}

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/page/reinvest" className="btn">
          Money Regular
        </Link>
        <Link href="/page/stockaverage" className="btn">
          Stock Average
        </Link>
        <Link href="/page/reinvest-emi" className="btn">
          Money After EMI
        </Link>

        <Link href="/page/sipcalculation" className="btn">
          SIP Calculations
        </Link>
        <Link href="/page/interestcalculations" className="btn">
          Interest Calculations
        </Link>
        <Link href="/page/agecalculator" className="btn">
          Age calculation
        </Link>
        <Link href="/page/sipcalculator" className="btn">
          SIP (Systematic Investment Plan)
        </Link>
        <Link href="/page/emicalculator" className="btn">
          EMI (Home/Car/Personal Loan)
        </Link>
        <Link href="/page/timezone" className="btn">
          Time Zone
        </Link>
      </div>
      {/* </div> */}
    </>
  );
}
