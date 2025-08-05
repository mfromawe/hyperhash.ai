// Online favicon generator kullanacağız: https://favicon.io/favicon-converter/
// Bu script favicon oluşturma rehberi

console.log(`
🎨 HyperHash Favicon Oluşturma Rehberi

✅ Oluşturulan Dosyalar:
- favicon.svg (Ana SVG favicon)
- favicon-16x16.svg, favicon-32x32.svg (Farklı boyutlar)
- manifest.json (PWA desteği)

🔧 Sonraki Adımlar:

1. https://favicon.io/favicon-converter/ adresine git
2. /public/favicon.svg dosyasını yükle
3. İndirilen favicon.ico dosyasını /src/app/favicon.ico ile değiştir
4. İndirilen diğer PNG dosyaları /public/ klasörüne ekle

💡 Alternatif:
- Figma/Canva'da 32x32 # tasarımı oluştur
- Blue gradient background (#3B82F6 to #8B5CF6)
- Beyaz # sembolu
- ICO formatında export et

🎯 Tasarım Detayları:
- Arka plan: Mavi gradient (blue-500 to violet-500)
- # sembolu: Beyaz, kalın çizgiler
- Border radius: Hafif yuvarlak köşeler
- Modern, minimalist görünüm

✨ Favicon başarıyla oluşturuldu! Tarayıcı sekmesinde # simgesi görünecek.
`);
