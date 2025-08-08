
import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

// Function to verify PayPal webhook signature
async function verifyWebhookSignature(request: Request) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID; // You need to set this in your .env.local
  const paypalTransmissionId = request.headers.get('paypal-transmission-id');
  const paypalTransmissionTime = request.headers.get('paypal-transmission-time');
  const paypalCertUrl = request.headers.get('paypal-cert-url');
  const paypalTransmissionSig = request.headers.get('paypal-transmission-sig');
  const webhookEventBody = await request.text(); // Read body as text for signature verification

  if (!webhookId || !paypalTransmissionId || !paypalTransmissionTime || !paypalCertUrl || !paypalTransmissionSig) {
    console.error('Missing PayPal webhook headers or WEBHOOK_ID.');
    return false;
  }

  try {
    const verificationResponse = await fetch(`${process.env.PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: JSON.stringify({
        auth_algo: request.headers.get('paypal-auth-algo'),
        cert_url: paypalCertUrl,
        transmission_id: paypalTransmissionId,
        transmission_time: paypalTransmissionTime,
        transmission_sig: paypalTransmissionSig,
        webhook_id: webhookId,
        webhook_event: JSON.parse(webhookEventBody), // Parse it back to JSON for the verification API
      }),
    });

    const verificationResult = await verificationResponse.json();
    return verificationResult.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('Error verifying PayPal webhook signature:', error);
    return false;
  }
}

export async function POST(req: Request) {
  // Verify webhook signature (IMPORTANT for security)
  const isSignatureValid = await verifyWebhookSignature(req.clone()); // Clone request to read body twice
  if (!isSignatureValid) {
    console.warn('PayPal webhook signature verification failed.');
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 403 });
  }

  try {
    const event = await req.json();
    console.log('Received PayPal webhook event:', event.event_type);

    switch (event.event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        // Handle new subscription activation
        const subscriptionId = event.resource.id;
        const payerEmail = event.resource.subscriber.email_address;
        const planId = event.resource.plan_id; // This is PayPal's plan ID

        // Find user by email and update their subscription
        // This assumes you have a way to map PayPal's plan_id to your internal planId (e.g., 'pro', 'premium')
        // For simplicity, let's assume planId from PayPal directly maps to our internal planId for now.
        // You might need a lookup table or a more robust mapping.
        
        // First, find the user by email
        const user = await AuthService.getUserByEmail(payerEmail); // Assuming you have this method

        if (user.success && user.user) {
          const updateResult = await AuthService.updateSubscription(user.user.id, planId); // Use PayPal's planId directly
          if (updateResult.success) {
            console.log(`Subscription activated for user ${user.user.id} to plan ${planId}`);
          } else {
            console.error(`Failed to update subscription for user ${user.user.id}: ${updateResult.error}`);
          }
        } else {
          console.error(`User not found for email: ${payerEmail}`);
        }
        break;
      case 'BILLING.SUBSCRIPTION.CANCELLED':
        // Handle subscription cancellation
        // Update user's subscription status to 'cancelled' or 'free'
        break;
      case 'PAYMENT.SALE.COMPLETED':
        // Handle successful payment for a subscription
        // This might be redundant if BILLING.SUBSCRIPTION.ACTIVATED handles initial setup
        // but useful for recurring payment confirmations.
        break;
      // Add more cases for other event types as needed
      default:
        console.log(`Unhandled PayPal event type: ${event.event_type}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
