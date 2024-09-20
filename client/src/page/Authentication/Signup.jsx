import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('http://localhost:5555/api/V1/register', formData);
        console.log(response.data); // Update Auth context with the new user data
        navigate('/main');
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const passwordStrength = (password) => {
    let score = 0;
    if (password.length > 7) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthColor = ['bg-red-500', 'bg-yellow-500', 'bg-yellow-400', 'bg-green-400', 'bg-green-500'];
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

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
          <div className="w-full max-w-md space-y-8 bg-white p-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600">Join us today and start your journey</p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <Label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </Label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div className="mt-4">
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>
               
              </div>

              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Password strength</span>
                    <span className={`text-sm font-medium ${strengthColor[passwordStrength(formData.password) - 1].replace('bg-', 'text-')}`}>
                      {strengthText[passwordStrength(formData.password) - 1]}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${strengthColor[passwordStrength(formData.password) - 1]}`} 
                      style={{ width: `${passwordStrength(formData.password) * 20}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  id="terms"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              {errors.terms && <p className="mt-2 text-sm text-red-600">{errors.terms}</p>}
              {errors.submit && <p className="mt-2 text-sm text-red-600">{errors.submit}</p>}

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  {isSubmitting ? 'Signing up...' : 'Sign up'}
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                  Log in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
