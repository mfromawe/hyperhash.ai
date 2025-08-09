const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL } = process.env;

// Export a helper so other modules can know if PayPal is configured
export const isPaypalConfigured = !!(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET && PAYPAL_API_URL);

function assertPaypalConfig() {
  if (!isPaypalConfigured) {
    throw new Error('PayPal not configured: missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET / PAYPAL_API_URL');
  }
}

// Function to get a PayPal access token (only called when configuration exists)
async function getAccessToken() {
  assertPaypalConfig();
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal token request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Function to create a PayPal subscription
export async function createSubscription(planId: string) {
  if (!isPaypalConfigured) {
    throw new Error('PayPal not configured');
  }
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
      application_context: {
        return_url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/success` : 'http://localhost:3000/payment/success',
        cancel_url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed` : 'http://localhost:3000/payment/failed',
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal subscription creation failed: ${response.status} ${text}`);
  }

  return response.json();
}
