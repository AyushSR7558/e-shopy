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
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(true);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const resendOtp = () => {
    
  }


  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
      inputRefs.current[index - 1]?.focus();
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {};
  return (
    <div className="w-full min-h-[85vh] py-10 bg-[#f1f1f1]">
      <h1 className="text-4xl font-Poppins font-semibold text-gray-700 text-center">
        Signup
      </h1>
      <p className="text-center text-lg font-medium py-3 text-[#00000099]">
        Home . Signup
      </p>
      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          <h3 className="text-xl font-poppins font-semibold text-center ">
            Signup to E-shopy
          </h3>
          <p className="text-gray-500 text-center">
            Already have account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
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
          {!showOtp ? (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Ayush Raut"
                  className="w-full  p-2 border text-gray-500 border-gray-300 outline-0 "
                  {...register("name", {
                    required: "Name is required",
                  })}
                ></input>
                {errors.email && (
                  <p className="text-red-500 text-[12px]">
                    {String(errors.email.message)}
                  </p>
                )}
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="ayush123@gmail.com"
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
                  <p className="text-red-500 text-[12px]">
                    {String(errors.email.message)}
                  </p>
                )}
                <div className="my-2">
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
                          message:
                            "Password length should be atleast 8 character",
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
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full text-lg cursor-pointer bg-gray-700 text-white py-2 rounded-xl"
                    >
                      Login
                    </button>
                    {serverError && (
                      <p className="text-red-500 text-sm mt-2 text-sm">
                        {serverError}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-center text-gray-700 mb-4 mt-2">
                Enter OTP{" "}
              </h3>
              <div className="flex justify-center text-black gap-6">
                {otp?.map((digit, index) => (
                  <input
                    type="tel"
                    inputMode="numeric"
                    key={index}
                    ref ={(el) => {(inputRefs.current[index] = el)}}
                    maxLength={1}
                    autoFocus={index === 0}
                    className="w-12 h-12 text-center border border-gray-300 outline-none rounded-xl"
                    value={digit}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <button className="w-full cursor-pointer bg-gray-700 mt-4 rounded-lg text-xl py-2">Verify</button>
              <p className="text-center  text-sm mt-4">
                  {canResend ?<><button onClick={resendOtp} className="text-blue-500 cursor-pointer">Resend Otp</button></> :<>`Resend Otp ${timer}</>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
