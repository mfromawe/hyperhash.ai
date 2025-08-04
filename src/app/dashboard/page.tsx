'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Link from 'next/link';

interface UsageStats {
  hashtagsGenerated: number;
  apiCalls: number;
  monthlyLimit: number;
  isLimitReached: boolean;
  monthYear: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUsageStats();
    }
  }, [user]);

  const fetchUsageStats = async () => {
    try {
      const response = await fetch('/api/auth/usage', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsageStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch usage stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const getUsagePercentage = () => {
    if (!usageStats || usageStats.monthlyLimit === -1) return 0;
    return Math.min((usageStats.hashtagsGenerated / usageStats.monthlyLimit) * 100, 100);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro': return 'from-blue-500 to-blue-600';
      case 'enterprise': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back, {user?.firstName || user?.email.split('@')[0]}!
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/tools"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate Hashtags
                </Link>
                
                {user?.plan === 'free' && (
                  <Link
                    href="/pricing"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Upgrade Plan
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Plan Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Plan
                </h3>
                <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getPlanColor(user?.plan || 'free')}`}>
                  {user?.plan?.toUpperCase() || 'FREE'}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  {usageStats?.monthlyLimit === -1 
                    ? 'Unlimited hashtags' 
                    : `${usageStats?.monthlyLimit || 50} hashtags per month`
                  }
                </p>
                
                {user?.plan === 'free' && (
                  <Link
                    href="/pricing"
                    className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Upgrade for more features →
                  </Link>
                )}
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                This Month's Usage
              </h3>
              
              {loadingStats ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Hashtags Generated</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {usageStats?.hashtagsGenerated || 0}
                      {usageStats?.monthlyLimit !== -1 && (
                        <span className="text-gray-500"> / {usageStats?.monthlyLimit}</span>
                      )}
                    </span>
                  </div>
                  
                  {usageStats?.monthlyLimit !== -1 && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          getUsagePercentage() > 80 ? 'bg-red-500' : 
                          getUsagePercentage() > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${getUsagePercentage()}%` }}
                      ></div>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    API Calls: {usageStats?.apiCalls || 0}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link
                  href="/tools"
                  className="block w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    🚀 Generate Hashtags
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Create viral hashtags for your content
                  </div>
                </Link>
                
                <Link
                  href="/guides"
                  className="block w-full text-left p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                >
                  <div className="font-medium text-green-900 dark:text-green-100">
                    📚 Learn Strategies
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Master hashtag strategies
                  </div>
                </Link>
                
                <Link
                  href="/dashboard/profile"
                  className="block w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                >
                  <div className="font-medium text-purple-900 dark:text-purple-100">
                    ⚙️ Account Settings
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    Manage your profile
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <p className="text-gray-600 dark:text-gray-400">
                Start generating hashtags to see your activity here
              </p>
              <Link
                href="/tools"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Your First Hashtags
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
