'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import AuthModal from './AuthModal';

export default function AuthButtons() {
  const { user, logout, loading } = useUserStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        {/* Plan Badge */}
        <div className="hidden sm:flex items-center">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            user.plan === 'free' 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              : user.plan === 'pro'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
          }`}>
            {user.plan.toUpperCase()}
          </span>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.firstName ? user.firstName[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.firstName || user.email.split('@')[0]}
            </span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
              <div className="py-2">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user.email
                    }
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                {/* Menu Items */}
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  📊 Dashboard
                </a>
                <a
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  ⚙️ Settings
                </a>
                <a
                  href="/dashboard/billing"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  💳 Billing
                </a>
                
                {user.plan === 'free' && (
                  <a
                    href="/pricing"
                    className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                  >
                    ⭐ Upgrade Plan
                  </a>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowAuthModal(true)}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          Get Started
        </button>
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="register"
      />
    </>
  );
}
