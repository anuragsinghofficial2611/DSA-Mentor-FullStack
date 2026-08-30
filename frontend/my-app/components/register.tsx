
"use client";
import { useRouter } from 'next/navigation'

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Code2,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");

  const router = useRouter();

  const passwordRequirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Contains an uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Contains a number",
      valid: /[0-9]/.test(password),
    },
  ];

  const[loading, setLoading] = useState(false);

  const handlesubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const password = formData.get("password");
    const email = formData.get('email');
    const username = formData.get('username');
    const payload = {name,username,email,password};
    setLoading(true);
    try{
      const response = await fetch('/api/auth/register',{
        method: "POST",
        headers: {
          "Content-type" : "application/json",
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json();
      if(!response.ok){
        console.log(data);
        return;
      }
      console.log(data);
      router.push('/')
    } catch(error){
      console.log(error)
    } finally{
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Code2 size={22} />
            </div>

            <span className="text-xl font-bold">
              DSA<span className="text-blue-400">Mentor</span>
            </span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Create your account
            </h1>

            <p className="text-gray-400 text-sm">
              Start solving problems with your AI DSA mentor.
            </p>
          </div>

          {/* GitHub */}
          <button
            type="button"
            className="w-full h-12 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition flex items-center justify-center gap-3 text-sm font-medium"
          >
            {/* <Github size={19} /> */}
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-white/10 flex-1" />

            <span className="text-xs text-gray-500">
              OR
            </span>

            <div className="h-px bg-white/10 flex-1" />
          </div>

          <form className="space-y-5" onSubmit={handlesubmit}>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Anurag Singh"
                required
                className="w-full h-12 px-4 rounded-lg bg-black/20 border border-white/10 outline-none text-sm placeholder:text-gray-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="anurag_dev"
                required
                className="w-full h-12 px-4 rounded-lg bg-black/20 border border-white/10 outline-none text-sm placeholder:text-gray-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full h-12 px-4 rounded-lg bg-black/20 border border-white/10 outline-none text-sm placeholder:text-gray-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 pr-12 rounded-lg bg-black/20 border border-white/10 outline-none text-sm placeholder:text-gray-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {password.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {passwordRequirements.map((requirement) => (
                    <div
                      key={requirement.label}
                      className={`flex items-center gap-2 text-xs ${
                        requirement.valid
                          ? "text-green-400"
                          : "text-gray-500"
                      }`}
                    >
                      {requirement.valid ? (
                        <Check size={14} />
                      ) : (
                        <X size={14} />
                      )}

                      {requirement.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  className="w-full h-12 px-4 pr-12 rounded-lg bg-black/20 border border-white/10 outline-none text-sm placeholder:text-gray-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 w-4 h-4 accent-blue-500"
              />

              <label
                htmlFor="terms"
                className="text-xs text-gray-500 leading-5"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled = {loading}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
            {(loading)? "loading...":  " Create account" }
            {(!loading)?  <ArrowRight size={18} />  : ""}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Learn. Struggle. Get hints. Solve. Master.
        </p>
      </div>
    </main>
  );
}