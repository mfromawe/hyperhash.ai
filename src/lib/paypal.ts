
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL } = process.env;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET || !PAYPAL_API_URL) {
  throw new Error('PayPal environment variables are not set.');
}

// Function to get a PayPal access token
async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Function to create a PayPal subscription
export async function createSubscription(planId: string) {
  const accessToken = await getAccessToken();
  const url = `${PAYPAL_API_URL}/v1/billing/subscriptions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      plan_id: planId,
      // You can add more details here like subscriber, application_context etc.
      // For example, to redirect after approval/cancellation:
      application_context: {
        return_url: 'http://localhost:3000/payment/success', // Replace with your success URL
        cancel_url: 'http://localhost:3000/payment/failed', // Replace with your cancel URL
      },
    }),
  });

  return response.json();
}
