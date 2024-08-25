"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/utils/config";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("User Signup", { formData });
    try {
      const userCredential = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );
      setFormData({
        email: "",
        password: "",
      });
      console.log("User sign in:", userCredential);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState<{
    general?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="md:w-1/2 bg-background text-primary p-8 md:p-36 flex flex-col items-center">
        <div className="w-full max-w-[320px]">
          <h1 className="text-base md:text-xl font-medium mt-2 md:-mt-16">
            Welcome Back 👋
          </h1>
          <h2 className="whitespace-nowrap text-14 my-2 md:my-4">
            Today is a new day. It&apos;s your day.You shape it.
            <br />
            Sign in to start managing your projects.
          </h2>
          <div className="mt-2 md:mt-4">
            <form onSubmit={handleSignIn} className="w-full">
              <div className="mb-2 relative">
                <label htmlFor="email" className="text-12">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="border bg-button border-grey rounded-xl focus:outline-none w-full p-2.5 text-base"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="text-12">
                  Password
                </label>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border bg-button border-grey rounded-xl focus:outline-none w-full p-2.5 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-4 bottom-4"
                >
                  {passwordVisibility ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>

              <button className="text-14 justify-end text-blue-600 mx-2 my-3">
                Forgot password?
              </button>
              <button
                type="submit"
                className="border text-background bg-primary rounded-xl focus:outline-none w-full p-2.5 text-base"
              >
                Sign In
              </button>
            </form>
            {/* Alternative Sign-In Options */}
            <div className="mb-16">
              <div className="flex items-center mt-8 mb-6">
                <div className="flex-grow border-t border-grey"></div>
                <span className="mx-4 text-gray-500">Or</span>
                <div className="flex-grow border-t border-grey"></div>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="bg-button rounded-xl flex items-center justify-center w-full p-2.5 text-14">
                  <FcGoogle className="mr-4 h-7 w-7" />
                  Sign in with Google
                </button>
                <button className="bg-button rounded-xl flex items-center justify-center w-full p-2.5 text-14">
                  <FaFacebook className="text-blue-600 mx-4 h-7 w-7" />
                  Sign in with Facebook
                </button>
              </div>
              <p className="text-center text-14 mt-16 ">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
