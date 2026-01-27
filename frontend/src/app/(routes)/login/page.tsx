"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleIcon from "../../../assets/svgs/google-icon.svg";
import FacebookIcon from "../../../assets/svgs/facebook-icon.svg";
import OutllookIcon from "../../../assets/svgs/outlook.svg";
import Image from "next/image";
import { error } from "console";
import { Eye, EyeClosed, EyeClosedIcon, EyeIcon, EyeOff } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {};
  return (
    <div className="w-full min-h-[85vh] py-10 bg-[#f1f1f1]">
      <h1 className="text-4xl font-Poppins font-semibold text-gray-700 text-center">
        Login
      </h1>
      <p className="text-center text-lg font-medium py-3 text-[#00000099]">
        Home . login
      </p>
      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          <h3 className="text-xl font-poppins font-semibold text-center ">
            Login to E-shopy
          </h3>
          <p className="text-gray-500 text-center">
            Don't have account?{" "}
            <Link href="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>
          <div className="flex justify-center  gap-5 py-2">
            <Image src={GoogleIcon} alt="google" />
            <Image src={FacebookIcon} alt="facebook" />
            <Image src={OutllookIcon} alt="outlook" />
          </div>
          <div className="flex items-center my-5 text-gray-400 text-[12px]">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3">or Sign in with Email</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="email123@gmail.com"
              className="w-full  p-2 border text-gray-500 border-gray-300 outline-0 "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
            ></input>
            {errors.email && (
              <p className="text-red-500 text-[12px]">{String(errors.email.message)}</p>
            )}

            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full  p-2 border text-gray-500 border-gray-300 outline-0 "
                placeholder="Min Length 8 char"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "Password length should be atleast 8 character",
                  },
                })}
              ></input>
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="text-black absolute top-0 py-2 right-3 flex  items-center text-gray-400 "
              >
                {passwordVisible ? <EyeIcon /> : <EyeOff />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-[12px]">
                  {String(errors.password.message)}
                </p>
              )}
              <div className="flex justify-between text-black items-center my-4">
                <label className="flex items-center text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Remember Me
                </label>
                <Link
                  href={"/forgot-password"}
                  className="text-blue-600 text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-lg cursor-pointer bg-gray-700 text-white py-2 rounded-xl"
              >
                Login
              </button>
              {serverError && (
                <p className="text-red-500 text-sm mt-2 text-[12px]">{serverError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
