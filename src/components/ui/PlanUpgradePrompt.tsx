'use client';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

interface PlanUpgradePromptProps {
  requiredPlan?: 'pro' | 'enterprise';
  feature?: string;
}

export default function PlanUpgradePrompt({ requiredPlan = 'pro', feature = 'this feature' }: PlanUpgradePromptProps) {
  const { user } = useUserStore();
  if (!user) return null;
  const order = ['free','pro','enterprise'];
  const userPlanIndex = order.indexOf(user.plan||'free');
  const needIndex = order.indexOf(requiredPlan);
  if (userPlanIndex >= needIndex) return null;
  return (
    <div className="my-4 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Upgrade required:</strong> {feature} is available on the {requiredPlan.toUpperCase()} plan.
        </div>
        <div className="flex items-center gap-2">
          <Link href="/pricing" className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded shadow hover:from-blue-700 hover:to-purple-700 transition-colors">View Plans</Link>
        </div>
      </div>
    </div>
  );
}
