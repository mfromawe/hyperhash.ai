'use client';
import { useUserStore } from '@/store/userStore';
import { useState } from 'react';

export default function EmailVerificationBanner() {
  const { user } = useUserStore();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user || user.emailVerified) return null;

  const resend = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await fetch('/api/auth/resend-verification', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email }) });
      setSent(true);
    } catch (e) {
      console.error('resend verification failed', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm py-2 px-4 flex items-center justify-between">
      <div>
        <strong>Email not verified.</strong> Please check your inbox (and spam). {sent && <span className="ml-2 italic">Link sent.</span>}
      </div>
      <button onClick={resend} disabled={loading} className="bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded px-3 py-1 text-xs font-medium transition-colors">
        {loading ? 'Sending...' : 'Resend'}
      </button>
    </div>
  );
}
