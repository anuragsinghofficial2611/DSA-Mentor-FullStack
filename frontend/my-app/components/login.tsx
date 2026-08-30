"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Code2, ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlesubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const payload = { email, password };
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("response is not ok" , data);
        return;
      } else {
        console.log("backend data" , data);
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
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

        {/* Login Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back
            </h1>

            <p className="text-gray-400 text-sm">
              Continue your journey to master DSA.
            </p>
          </div>

          {/* GitHub Login */}
          {/* <button
            type="button"
            className="w-full h-12 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition flex items-center justify-center gap-3 text-sm font-medium"
          >
            {/* <Github size={19} /> */}
          {/* Continue with GitHub */}
          {/* </button>  */}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-gray-500">
              OR
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <form className="space-y-5" onSubmit={handlesubmit}>
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
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-lg bg-black/20 border border-white/10 outline-none text-sm placeholder:text-gray-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
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
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 accent-blue-500"
              />

              <label
                htmlFor="remember"
                className="text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>


            {/* Submit */}
            < button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              {(loading) ? "loading..." : "Sign in"}
              {(!loading) ? <ArrowRight size={18} /> : ""}

            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Learn. Struggle. Get hints. Solve. Master.
        </p>
      </div>
    </main >
  );
}