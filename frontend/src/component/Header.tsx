import { Search, HeartIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import Profile from "@/assets/svgs/profile-icon.svg";
import Image from "next/image";
import HeaderBottom from "./HeaderBottom";

export default function Header() {
  return (
    <div className="w-full bg-gray-900">
      <div className="w-[80%] py-5 m-auto flex items-center justify-between ">
        <div>
          <Link href={"/"}>
            <span className="text-2xl font-semibold">E-shopy</span>
          </Link>
        </div>
        <div className="w-[50%] relative ">
          <input
            type="text"
            placeholder="Search product"
            className="w-full px-4 font-Popping font-medium border-[2.5px] border-[#3489FF] rounded-2xl outline-none h-[55]"
          ></input>

          <div className="w-15 cursor-pointer flex items-center justify-center h-13.75 bg-[#3489FF] rounded-r-2xl absolute top-0 right-0">
            <Search color="white" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Image height={50} src={Profile} alt="profile" />
            </Link>
            <Link href={"/login"}>
              <span className="block font-medium">Hello,</span>
              <span className="font-semibold">Sign in!</span>
            </Link>
          </div>
          <Link href={"/wishlist"} className="relative">
            <HeartIcon />
            <div className="flex w-4 text-[10px] h-4 border-2 border-white bg-red-500 rounded-full items-center justify-center absolute top-[-5] right-[-10]">
              0
            </div>
          </Link>
          <Link href={"/wishlist"} className="relative">
            <ShoppingCartIcon />
            <div className="flex w-4 text-[10px] h-4 border-2 border-white bg-red-500 rounded-full items-center justify-center absolute top-[-5] right-[-10]">
              0
            </div>
          </Link>
        </div>
      </div>
      <div className="border-b border-gray-800"></div>
      <HeaderBottom />
    </div>
  );
}
