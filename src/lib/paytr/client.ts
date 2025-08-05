import crypto from 'crypto';
import axios from 'axios';

export interface PayTRPaymentRequest {
  merchantId: string;
  userIp: string;
  merchantOid: string;
  email: string;
  paymentAmount: number;
  currency: string;
  userBasket: string;
  noInstallment: number;
  maxInstallment: number;
  userAddress: string;
  userPhone: string;
  merchantOkUrl: string;
  merchantFailUrl: string;
  userBasketDetail: string;
  timeout: number;
  debugOn: number;
  testMode: number;
  hash: string;
}

export interface PayTRResponse {
  status: 'success' | 'failed';
  reason?: string;
  token?: string;
}

export class PayTRService {
  private readonly merchantId: string;
  private readonly merchantKey: string;
  private readonly merchantSalt: string;
  private readonly testMode: boolean;

  constructor() {
    this.merchantId = process.env.PAYTR_MERCHANT_ID!;
    this.merchantKey = process.env.PAYTR_MERCHANT_KEY!;
    this.merchantSalt = process.env.PAYTR_MERCHANT_SALT!;
    this.testMode = process.env.PAYTR_TEST_MODE === 'true';
  }

  /**
   * Create payment request for PayTR
   */
  async createPayment(params: {
    userId: string;
    email: string;
    amount: number;
    planType: string;
    userIp: string;
    phone?: string;
  }): Promise<PayTRResponse> {
    const merchantOid = `${params.userId}_${Date.now()}`;
    
    // User basket (PayTR requirement)
    const userBasket = JSON.stringify([
      [`${params.planType} Plan`, params.amount, 1]
    ]);

    // Hash calculation for security
    const hashString = `${this.merchantId}${params.userIp}${merchantOid}${params.email}${params.amount}TL${userBasket}1${this.merchantSalt}`;
    const hash = crypto.createHmac('sha256', this.merchantKey).update(hashString).digest('base64');

    const paymentData: PayTRPaymentRequest = {
      merchantId: this.merchantId,
      userIp: params.userIp,
      merchantOid,
      email: params.email,
      paymentAmount: params.amount,
      currency: 'TL',
      userBasket,
      noInstallment: 0, // 0 = allow installments
      maxInstallment: 12,
      userAddress: 'Turkey', // You can collect real address
      userPhone: params.phone || '5554443322',
      merchantOkUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
      merchantFailUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/failed`,
      userBasketDetail: userBasket,
      timeout: 30,
      debugOn: this.testMode ? 1 : 0,
      testMode: this.testMode ? 1 : 0,
      hash
    };

    try {
      const response = await axios.post(
        'https://www.paytr.com/odeme/api/get-token',
        new URLSearchParams(paymentData as any),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('PayTR payment creation error:', error);
      throw new Error('Payment creation failed');
    }
  }

  /**
   * Verify webhook callback from PayTR
   */
  verifyCallback(params: any): boolean {
    const {
      merchant_id,
      status,
      total_amount,
      hash,
      failed_reason_code,
      failed_reason_msg,
      test_mode,
      payment_type,
      currency,
      merchant_oid
    } = params;

    // Hash verification
    const hashString = `${merchant_id}${status}${total_amount}${this.merchantSalt}`;
    const calculatedHash = crypto.createHmac('sha256', this.merchantKey).update(hashString).digest('base64');

    return hash === calculatedHash;
  }

  /**
   * Process successful payment
   */
  async processSuccessfulPayment(params: {
    merchantOid: string;
    totalAmount: number;
    currency: string;
  }) {
    // Extract userId from merchantOid
    const userId = params.merchantOid.split('_')[0];
    
    // Here you would update the subscription in your database
    // Similar to Stripe webhook handling
    
    return {
      userId,
      amount: params.totalAmount,
      currency: params.currency,
      status: 'completed'
    };
  }
}

export const paytrService = new PayTRService();
