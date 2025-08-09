// Simple email service stub. Replace with real provider (SendGrid, Resend, SES, etc.)
export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const verifyUrl = `${baseUrl}/verify-email?token=${encodeURIComponent(token)}`;
  // For now just log. Integrate real email later.
  console.log(`[email] Verification email to ${email}: ${verifyUrl}`);
  return { success: true };
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;
  console.log(`[email] Password reset email to ${email}: ${resetUrl}`);
  return { success: true };
}
