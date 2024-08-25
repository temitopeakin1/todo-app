"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { auth } from "@/app/utils/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

interface FormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, password: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setErrors({}); // clear previous error notification

    try {
      const userCredential = await createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      if (userCredential) {
        await updateProfile(userCredential.user, {
          displayName: formData.userName,
        });
        setSuccessMessage("Sign up successful!");
        setFormData({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
      console.log("User signed up:", userCredential);
    } catch (error: any) {
      setErrors({ ...errors, general: error.message });
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
      router.push("/login");
    }
  };

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
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
            Sign up 👋
          </h1>
          <h2 className="whitespace-nowrap text-14 my-2 md:my-4">
            Today is a new day. It&apos;s your day.You shape it.
            <br />
            Sign in to start managing your projects.
          </h2>
          <div className="mt-2 md:mt-4">
            <form onSubmit={handleSignUp} className="w-full">
              <div className="mb-2 relative">
                <label htmlFor="username" className="text-12">
                  Name
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                  className="border bg-button border-grey rounded-xl focus:outline-none w-full p-2.5 text-base"
                  required
                />
              </div>
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
              <div className="mb-2 relative">
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
              <div className="mb-6 relative">
                <label htmlFor="confirmPassword" className="text-12">
                  Confirm Password
                </label>
                <input
                  type={confirmPasswordVisibility ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border bg-button border-grey rounded-xl focus:outline-none w-full p-2.5 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={handleConfirmPasswordVisibility}
                  className="absolute right-4 bottom-4"
                >
                  {confirmPasswordVisibility ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="border text-background bg-primary rounded-xl focus:outline-none w-full p-2.5 text-base"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <div className="mb-16">
              <p className="text-center text-14 mt-2 ">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600">
                  Sign In
                </Link>
              </p>
              {successMessage && (
                <div className="mt-2 text-center text-primary font-semibold">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
