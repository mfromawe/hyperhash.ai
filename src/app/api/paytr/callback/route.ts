import { NextRequest, NextResponse } from 'next/server';
import { paytrService } from '@/lib/paytr/client';
import { prisma } from '@/lib/database/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    
    const callbackData = {
      merchant_id: params.get('merchant_id'),
      status: params.get('status'),
      total_amount: params.get('total_amount'),
      hash: params.get('hash'),
      failed_reason_code: params.get('failed_reason_code'),
      failed_reason_msg: params.get('failed_reason_msg'),
      test_mode: params.get('test_mode'),
      payment_type: params.get('payment_type'),
      currency: params.get('currency'),
      merchant_oid: params.get('merchant_oid')
    };

    // Verify the callback
    if (!paytrService.verifyCallback(callbackData)) {
      console.error('PayTR callback verification failed');
      return NextResponse.json({ status: 'failed' }, { status: 400 });
    }

    // Process based on payment status
    if (callbackData.status === 'success') {
      await handleSuccessfulPayment(callbackData);
      
      // PayTR expects "OK" response for successful processing
      return new NextResponse('OK', { status: 200 });
    } else {
      await handleFailedPayment(callbackData);
      
      // Still return OK to acknowledge receipt
      return new NextResponse('OK', { status: 200 });
    }

  } catch (error) {
    console.error('PayTR callback error:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

async function handleSuccessfulPayment(data: any) {
  try {
    // Extract userId from merchant_oid
    const userId = data.merchant_oid?.split('_')[0];
    
    if (!userId) {
      console.error('No userId found in merchant_oid:', data.merchant_oid);
      return;
    }

    // Determine plan type based on amount
    let planId = 'free';
    const amount = parseInt(data.total_amount);
    
    if (amount === 299) {
      planId = 'pro';
    } else if (amount === 899) {
      planId = 'enterprise';
    }

    // Update user subscription
    await prisma.subscription.upsert({
      where: { userId },
      update: {
        planId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        updatedAt: new Date(),
      },
      create: {
        userId,
        planId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    console.log(`PayTR: Subscription updated for user ${userId}, plan: ${planId}`);
    
    // You could also send a confirmation email here
    
  } catch (error) {
    console.error('Error handling successful PayTR payment:', error);
  }
}

async function handleFailedPayment(data: any) {
  try {
    const userId = data.merchant_oid?.split('_')[0];
    
    console.log(`PayTR: Payment failed for user ${userId}`, {
      reason_code: data.failed_reason_code,
      reason_msg: data.failed_reason_msg,
      amount: data.total_amount
    });
    
    // You might want to log this to a payment_attempts table
    // or send a notification to the user
    
  } catch (error) {
    console.error('Error handling failed PayTR payment:', error);
  }
}
