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
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errors, setErrors] = useState<{
    general?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const isAuthorized = await checkUserAuthorization(formData.email);
      if (!isAuthorized) {
        setErrors({
          general: "Unauthorized User. Please sign up.",
        });
        setLoading(false);
        return;
      }
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // If sign-in is successful
      sessionStorage.setItem("user", "true");
      setFormData({
        email: "",
        password: "",
      });
      router.push("/"); // Redirect to the home page
    } catch (e: any) {
      setErrors({ general: "Login error: " + e.message });
      console.error("Login error:", e);
    } finally {
      setLoading(false);
    }
  };

  const checkUserAuthorization = async (email: string): Promise<boolean> => {
    try {
      const user = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );
      return user ? true : false;
    } catch (error) {
      console.error("Authorization check error:", error);
      return false;
    }
  };

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

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="md:w-1/2 bg-background text-primary p-8 md:p-36 flex flex-col items-center">
        <div className="w-full max-w-[320px]">
          <h1 className="text-base md:text-xl font-medium mt-2 md:-mt-16">
            Welcome Back 👋
          </h1>
          <h2 className="whitespace-nowrap text-14 my-2 md:my-4">
            Today is a new day. It&apos;s your day. You shape it.
            <br />
            Sign in to start managing your projects.
          </h2>
          <div className="mt-2 md:mt-4">
            <form onSubmit={handleSignIn} className="w-full">
              {errors.general && (
                <div className="text-red-600 mb-2 text-center text-12">
                  {errors.general}
                </div>
              )}
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
                  className={`border bg-button border-grey rounded-xl focus:outline-none w-full p-2.5 text-base ${
                    errors.email ? "border-red-600" : ""
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-12 mt-1">{errors.email}</p>
                )}
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
                  className={`border bg-button border-grey rounded-xl focus:outline-none w-full p-2.5 text-base ${
                    errors.password ? "border-red-600" : ""
                  }`}
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
                {errors.password && (
                  <p className="text-red-600 text-12 mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex justify-end my-3">
                <button className="text-14 justify-right text-blue-600">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="border text-background bg-primary rounded-xl focus:outline-none w-full p-2.5 text-base"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
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
