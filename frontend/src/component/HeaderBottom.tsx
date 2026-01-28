"use client";

import { navItems } from "@/configs/constants";
import { AlignLeft, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link"

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<div className={`w-full transition-all duration-300 ${isSticky ? `fixed top-0 left-0 z-50 bg-gray-900 shadow-lg` : `relative`}`}>
  <div className={`w-[80%] mx-auto flex items-center justify-between ${isSticky ? `py-3` : `py-4`}`}>
    
    {/* Dropdown Trigger */}
    <div className="relative"> {/* Added relative wrapper */}
      <div
        className={`w-[260px] cursor-pointer flex items-center justify-between px-5 h-[50px] bg-gray-800 rounded-lg ${isSticky && "-mb-2"}`}
        onClick={() => setShow(!show)}
      >
        <div className="flex items-center gap-2">
          <AlignLeft color="White" />
          <span className="text-white font-medium">All Department</span>
        </div>
        <ChevronDown color="White" className={`transition-transform ${show ? "rotate-180" : ""}`} />
      </div>
      
      {/* Dropdown Content */}
      {show && (
        <div 
          className={`absolute left-0 mt-1 w-[260px] h-[400px] bg-white shadow-xl rounded-lg z-50 overflow-auto transition-all duration-300 ${isSticky ? "top-[60px]" : "top-[55px]"}`}
        >
          {/* Your dropdown content here */}
          <div className="p-4">
            <p>Dropdown Content</p>
          </div>
        </div>
      )}
    </div>
    {/* Navigation */}
      <div className="flex items-center">
        {navItems.map((i:NavItemsTypes, index:number) => (
            <Link className="px-5 font-medium text-lg" href={i.href} key={index }>
                {i.title}
            </Link>
        )) }
      </div>
  </div>
</div>
  );
};

export default HeaderBottom;
