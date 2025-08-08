'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { register } = useUserStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return 'Email and password are required';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (!acceptTerms) {
      return 'Please accept the Terms of Service';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        username: formData.username || undefined
      });
      
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join HyperHash
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Create your account and start generating viral hashtags
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              placeholder="Choose a username (optional)"
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L7.76 7.76m6.018 6.018L12 12m1.878 1.878l2.122 2.122" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.email || !formData.password || !acceptTerms}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium
              hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
              transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Free Plan Info */}
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-green-700 dark:text-green-300 text-sm font-medium mb-2">
            🎉 Free Plan Includes
          </p>
          <ul className="text-green-600 dark:text-green-400 text-xs space-y-1">
            <li>• 50 hashtags per month</li>
            <li>• All social media platforms</li>
            <li>• Basic analytics</li>
            <li>• Community support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
