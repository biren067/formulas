import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <>
    {/* <Calculator/> */}
    <div className="flex justify-center items-center mx-2 px-2 gap-3">
    
        <Link className={'link'} href='/page/reinvest'>Investing money continously </Link>
      
        <Link className={'link'} href='/page/agecalculator'>Age calculation</Link>
      
        <Link className={'link'} href='/page/sipcalculator'>SIP (Systematic Investment Plan)</Link>
      
     <Link className={'link'} href='/page/emicalculator'>EMI(Home/Car/Persoan Load)</Link>
    
        <Link className={'link'} href='/page/timezone'>Time Zone</Link>
      
    
        <Link className={'link'} href='/page/stockaverage'>Stock Average</Link>
      
    
    </div>
 
      </>
  );
}
