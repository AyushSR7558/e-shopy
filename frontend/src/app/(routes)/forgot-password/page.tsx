"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleIcon from "../../../assets/svgs/google-icon.svg";
import FacebookIcon from "../../../assets/svgs/facebook-icon.svg";
import OutlookIcon from "../../../assets/svgs/outlook.svg";
import Image from "next/image";
import {
  Eye,
  EyeClosed,
  EyeClosedIcon,
  EyeIcon,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type FormData = {
  email: string;
};

type VerifyData = FormData & {
  otp: string;
};

type ResetPasswordData = {
  password: string;
  confirmPassword: string;
};

const ForgotPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userData, setUserData] = useState<FormData | null>(null);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [state, setState] = useState<"email" | "otp" | "reset">("email");
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forgot-password-user`,
        data,
      );
      return response;
    },
    onSuccess: (res, formData) => {
      setUserData(formData);
      setState("otp");
      setCanResend(false);
      setTimer(60);
      startResendTimer();
      console.log(res);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data?.message || error.message);
        console.log(error.message);
      } else {
        setServerError("Something went wrong");
      }

      setTimeout(() => {
        setServerError("");
      }, 3000);
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: async (data: VerifyData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-forgot-password-user`,
        data,
      );
      return response;
    },
    onSuccess: (res) => {
      setState("reset");
      setServerSuccess("OTP verified successfully!");
      setTimeout(() => {
        setServerSuccess("");
      }, 3000);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data?.message || error.message);
        console.log(error.message);
      } else {
        setServerError("Something went wrong");
      }

      setTimeout(() => {
        setServerError("");
      }, 3000);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reset-password-user`,
        {
          ...data,
          email: userData?.email,
        },
      );
      return response;
    },
    onSuccess: (res) => {
      setServerSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data?.message || error.message);
        console.log(error.message);
      } else {
        setServerError("Something went wrong");
      }

      setTimeout(() => {
        setServerError("");
      }, 3000);
    },
  });

  const resendOtp = () => {
    if (userData && canResend) {
      forgotPasswordMutation.mutate(userData);
    }
  };

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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<FormData>();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    watch,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordData>();

  const onSubmitEmail = (data: FormData) => {
    forgotPasswordMutation.mutate(data);
  };

  const onSubmitReset = (data: ResetPasswordData) => {
    resetPasswordMutation.mutate(data);
  };

  const renderEmailView = () => (
    <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
      <label className="block text-gray-700 mb-1">Email</label>
      <input
        type="email"
        placeholder="ayush123@gmail.com"
        className="w-full p-2 border text-gray-500 border-gray-300 outline-0 rounded"
        {...registerEmail("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email",
          },
        })}
      />
      {emailErrors.email && (
        <p className="text-red-500 text-[12px]">
          {String(emailErrors.email.message)}
        </p>
      )}
      <div className="my-2">
        <div className="mt-4">
          <button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="w-full text-lg cursor-pointer bg-gray-700 text-white py-2 rounded-xl hover:bg-gray-800 transition-colors"
          >
            {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </form>
  );

  const renderOtpView = () => (
    <div>
      <h3 className="text-xl font-semibold text-center text-gray-700 mb-4 mt-2">
        Enter OTP
      </h3>
      <p className="text-gray-600 text-center mb-6">
        We've sent a verification code to {userData?.email}
      </p>
      <div className="flex justify-center text-black gap-4">
        {otp?.map((digit, index) => (
          <input
            type="tel"
            inputMode="numeric"
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            maxLength={1}
            autoFocus={index === 0}
            className="w-12 h-12 text-center border border-gray-300 outline-none rounded-xl text-lg font-semibold"
            value={digit}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            onChange={(e) => handleOtpChange(index, e.target.value)}
          />
        ))}
      </div>
      <button
        onClick={() => {
          if (!otp.every((d) => /^\d$/.test(d))) {
            setServerError("Please enter a valid 4-digit OTP");
            setTimeout(() => setServerError(""), 3000);
            return;
          }
          sendOtpMutation.mutate({
            otp: otp.join(""),
            email: userData?.email!,
          });
        }}
        disabled={sendOtpMutation.isPending}
        className="w-full cursor-pointer bg-gray-700 mt-6 rounded-lg text-xl py-2 text-white hover:bg-gray-800 transition-colors"
      >
        {sendOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
      </button>
      <p className="text-center text-sm mt-4">
        {canResend ? (
          <>
            Didn't receive code?{" "}
            <button
              onClick={resendOtp}
              className="text-blue-500 cursor-pointer hover:text-blue-600"
              disabled={!canResend}
            >
              Resend OTP
            </button>
          </>
        ) : (
          <>Resend OTP in {timer} seconds</>
        )}
      </p>
      <div className="text-center mt-4">
        <button
          onClick={() => setState("email")}
          className="text-blue-500 cursor-pointer hover:text-blue-600"
        >
          Back to Email
        </button>
      </div>
    </div>
  );

  const renderResetPasswordView = () => (
    <form onSubmit={handleSubmitReset(onSubmitReset)}>
      <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
        Reset Password
      </h3>
      <p className="text-gray-600 text-center mb-6">
        Enter your new password for {userData?.email}
      </p>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">New Password</label>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full p-2 border text-gray-500 border-gray-300 outline-0 rounded pr-10"
            {...registerReset("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {resetErrors.password && (
          <p className="text-red-500 text-[12px]">
            {String(resetErrors.password.message)}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm new password"
            className="w-full p-2 border text-gray-500 border-gray-300 outline-0 rounded pr-10"
            {...registerReset("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {resetErrors.confirmPassword && (
          <p className="text-red-500 text-[12px]">
            {String(resetErrors.confirmPassword.message)}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={resetPasswordMutation.isPending}
        className="w-full text-lg cursor-pointer bg-gray-700 text-white py-2 rounded-xl hover:bg-gray-800 transition-colors"
      >
        {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
      </button>
      
      <div className="text-center mt-4">
        <button
          onClick={() => setState("otp")}
          className="text-blue-500 cursor-pointer hover:text-blue-600"
        >
          Back to OTP
        </button>
      </div>
    </form>
  );

  const getViewTitle = () => {
    switch (state) {
      case "email":
        return "Forgot Password";
      case "otp":
        return "Verify OTP";
      case "reset":
        return "Reset Password";
      default:
        return "Forgot Password";
    }
  };

  const getViewDescription = () => {
    switch (state) {
      case "email":
        return "Enter your email to receive a password reset OTP";
      case "otp":
        return "Enter the OTP sent to your email";
      case "reset":
        return "Set your new password";
      default:
        return "";
    }
  };

  return (
    <div className="w-full min-h-[85vh] py-10 bg-[#f1f1f1]">
      <h1 className="text-4xl font-Poppins font-semibold text-gray-700 text-center">
        Forgot Password
      </h1>
      <p className="text-center text-lg font-medium py-3 text-[#00000099]">
        Home . Forgot-password
      </p>
      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          <h3 className="text-xl font-poppins font-semibold text-center">
            {getViewTitle()}
          </h3>
          <p className="text-gray-500 text-center mb-4">
            {getViewDescription()}
          </p>
          
          {state === "email" && (
            <>
              <div className="flex justify-center gap-5 py-2">
                <Image src={GoogleIcon} alt="google" />
                <Image src={FacebookIcon} alt="facebook" />
                <Image src={OutlookIcon} alt="outlook" />
              </div>
              <div className="flex items-center my-5 text-gray-400 text-[12px]">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3">or Sign in with Email</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            </>
          )}

          {state === "email" && renderEmailView()}
          {state === "otp" && renderOtpView()}
          {state === "reset" && renderResetPasswordView()}

          {serverError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600 text-center">{serverError}</p>
            </div>
          )}

          {serverSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-600 text-center">{serverSuccess}</p>
            </div>
          )}

          {state === "email" && (
            <p className="text-gray-500 text-center mt-4">
              Go back to{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;