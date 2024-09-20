// src/pages/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await login(formData);
        navigate("/main"); // Redirect to a dashboard or another page after login
      } catch (error) {
        setErrors({ form: "Invalid email or password" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="lg:flex-1 flex flex-col justify-center items-center p-8 lg:p-16">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please sign in to your account
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <Label htmlFor="email-address" className="sr-only">
                      Email address
                    </Label>
                    <Input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`appearance-none relative block w-full my-4 px-3 py-2 border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <Label htmlFor="password" className="sr-only">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <Label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                {errors.form && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    {errors.form}
                  </p>
                )}

                <div>
                  <Button
                    type="submit"
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </Button>
                </div>
              </form>
              {/* Bottom - Signup link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
