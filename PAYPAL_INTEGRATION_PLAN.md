# PayPal Abonelik Entegrasyon Planı

Bu plan, tek seferlik ödemelerden PayPal Abonelikleri'ne geçişi detaylandırmaktadır.

1.  **PayPal Geliştirici Hesabı Kurulumu:**
    *   PayPal geliştirici hesabınızda abonelik planlarını (örneğin, 'Pro', 'Premium' için) oluşturun ve ilgili `plan_id`'lerini alın.
    *   Webhook'ları yapılandırın (örneğin, `BILLING.SUBSCRIPTION.ACTIVATED`, `PAYMENT.SALE.COMPLETED` olayları için).

2.  **Environment Değişkenleri:**
    *   `.env.local` dosyasında `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_API_URL` değişkenlerinin doğru şekilde ayarlandığından emin olun.

3.  **`src/lib/paypal.ts` Güncellemesi:**
    *   `createOrder` fonksiyonunu `createSubscription` olarak yeniden adlandırın ve abonelik oluşturma API çağrısını (`/v1/billing/subscriptions`) kullanacak şekilde güncelleyin.
    *   `captureOrder` fonksiyonunu kaldırın veya abonelik yönetimi için gerekli yeni fonksiyonları ekleyin (örneğin, abonelik iptali).

4.  **API Rotaları Güncellemesi:**
    *   `src/app/api/paypal/orders/route.ts`: Abonelik oluşturma isteğini işleyecek şekilde güncelleyin. Bu rota, `createSubscription` fonksiyonunu çağıracak.
    *   `src/app/api/paypal/webhooks/route.ts` (Yeni): PayPal'dan gelen webhook bildirimlerini işlemek için yeni bir rota oluşturun. Bu rota, abonelik durum güncellemelerini (aktivasyon, ödeme, iptal vb.) yönetecek ve veritabanını güncelleyecek.

5.  **`src/components/payment/PayPalPayments.tsx` Güncellemesi:**
    *   `PayPalButtons` bileşenindeki `createOrder` prop'unu `createSubscription` olarak değiştirin.
    *   `createSubscription` fonksiyonu, PayPal'dan alınan `plan_id`'yi kullanacak.
    *   `onApprove` fonksiyonu, `subscriptionID`'yi alacak ve bu bilgiyi sunucuya (webhook veya ayrı bir API çağrısı ile) iletecek.

6.  **Veritabanı Güncellemesi:**
    *   `src/lib/auth/service.ts` içindeki `updateSubscription` fonksiyonu, webhook rotası tarafından çağrılarak kullanıcının abonelik durumunu güncelleyecek.
    *   Gerekirse `Subscription` modelini (Prisma schema) abonelik ID'si, başlangıç/bitiş tarihleri, durum gibi ek alanlarla güncelleyin.

7.  **Frontend (UI) Güncellemesi:**
    *   Fiyatlandırma sayfasındaki (örneğin, `src/app/pricing/page.tsx`) ödeme akışını abonelik modeline uygun hale getirin.

8.  **Test:**
    *   Uçtan uca testler yaparak abonelik oluşturma, ödeme, iptal ve durum güncellemelerinin doğru çalıştığından emin olun.