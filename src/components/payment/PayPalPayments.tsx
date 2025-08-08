
'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { useUserStore } from '@/store/userStore';

interface PayPalButtonProps {
  paypalPlanId: string; // The actual PayPal Plan ID
  planName: string; // For display purposes
}

const PayPalButtonWrapper = ({ paypalPlanId, planName }: PayPalButtonProps) => {
  const [error, setError] = useState<string | null>(null);
  const { token } = useUserStore();

  const createSubscription = async (data: any, actions: any) => {
    try {
      const res = await fetch('/api/paypal/orders', { // This endpoint will now create a subscription
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planId: paypalPlanId }), // Send the PayPal plan ID
      });

      const subscription = await res.json();
      if (subscription.error) {
        throw new Error(subscription.error);
      }
      // The PayPal API returns a subscription ID, which we pass to actions.subscription.create
      return actions.subscription.create({
        plan_id: paypalPlanId,
      });
    } catch (err: any) {
      setError(`Failed to create subscription: ${err.message || err}`);
      return '';
    }
  };

  const onApprove = async (data: any, actions: any) => {
    // For subscriptions, the actual capture/activation is handled by PayPal webhooks.
    // Here, we just confirm the subscription was approved by the user.
    // We can redirect to a success page or show a success message.
    alert(`Subscription successful! Subscription ID: ${data.subscriptionID}`);
    // Optionally, redirect to a dashboard or success page
    // window.location.href = '/dashboard';
  };

  const onError = (err: any) => {
    setError('An error occurred with the PayPal subscription.');
    console.error('PayPal Error:', err);
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <PayPalButtons
        style={{ layout: 'vertical', label: 'subscribe' }}
        createSubscription={createSubscription}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};

const PayPalPayments = ({ paypalPlanId, planName }: PayPalButtonProps) => {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!paypalClientId) {
    return <div>Loading PayPal...</div>;
  }

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD', vault: true, intent: 'subscription' }}>
      <PayPalButtonWrapper paypalPlanId={paypalPlanId} planName={planName} />
    </PayPalScriptProvider>
  );
};

export default PayPalPayments;


export default PayPalPayments;
