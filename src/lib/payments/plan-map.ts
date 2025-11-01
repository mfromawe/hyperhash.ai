// External payment provider plan/price ID -> internal planId mapping
// Populate via environment variables or hardcode as needed.
// Stripe Price IDs
const STRIPE_PRICE_PRO = process.env.STRIPE_PRICE_PRO || '';
const STRIPE_PRICE_ENTERPRISE = process.env.STRIPE_PRICE_ENTERPRISE || '';

// PayPal Plan IDs
const PAYPAL_PLAN_PRO_ID = process.env.PAYPAL_PLAN_PRO_ID || '';
const PAYPAL_PLAN_ENTERPRISE_ID = process.env.PAYPAL_PLAN_ENTERPRISE_ID || '';

export const STRIPE_PRICE_MAP: Record<string, string> = Object.fromEntries(
  [
    [STRIPE_PRICE_PRO, 'pro'],
    [STRIPE_PRICE_ENTERPRISE, 'enterprise']
  ].filter(([k]) => k)
);

export const PAYPAL_PLAN_MAP: Record<string, string> = Object.fromEntries(
  [
    [PAYPAL_PLAN_PRO_ID, 'pro'],
    [PAYPAL_PLAN_ENTERPRISE_ID, 'enterprise']
  ].filter(([k]) => k)
);

export function mapStripePriceToPlan(priceId?: string | null): string | null {
  if (!priceId) return null;
  return STRIPE_PRICE_MAP[priceId] || null;
}

export function mapPaypalPlanToPlan(externalPlanId?: string | null): string | null {
  if (!externalPlanId) return null;
  return PAYPAL_PLAN_MAP[externalPlanId] || null;
}
