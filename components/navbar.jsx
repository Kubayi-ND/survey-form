
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
    const pathname = usePathname();
    
    return (
        <nav className="flex items-center justify-between px-10 py-5 ">
                <h1 className="font-bold">_Surveys</h1>
                <div className="flex flex-end gap-6">
                    <Link 
                        href="/" 
                        className={pathname === "/" ? "text-blue-500 font-medium" : "hover:text-blue-400"}
                    >
                        FILL OUT SURVEY
                    </Link>
                    <Link 
                        href="/surveyresults" 
                        className={pathname === "/surveyresults" ? "text-blue-500 font-medium" : "hover:text-blue-400"}
                    >
                        VIEW SURVEY RESULTS
                    </Link>
                </div>
        </nav>
    );
};

export default Navbar;
