'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Tab Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl border border-gray-200 dark:border-gray-700 border-b-0">
            <div className="flex">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 px-6 text-sm font-medium rounded-tl-2xl transition-colors ${
                  activeTab === 'login'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-4 px-6 text-sm font-medium rounded-tr-2xl transition-colors ${
                  activeTab === 'register'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-b-2xl border border-gray-200 dark:border-gray-700 border-t-0 -mt-px">
            {activeTab === 'login' ? (
              <div className="p-8">
                <LoginForm 
                  onSuccess={handleSuccess}
                  onSwitchToRegister={() => setActiveTab('register')}
                />
              </div>
            ) : (
              <div className="p-8">
                <RegisterForm 
                  onSuccess={handleSuccess}
                  onSwitchToLogin={() => setActiveTab('login')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render outside the component tree
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}
