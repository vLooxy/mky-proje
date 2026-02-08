# Vercel Deployment Guide (Production Ready)

Bu rehber, projenizin Vercel üzerinde sorunsuz çalışması ve "localhost" bağımlılığının tamamen bitmesi için gerekli adımları içerir.

## 1. Hazırlık (Lokal'de Yapıldı) ✅

- [x] Veritabanı Neon (PostgreSQL) olarak ayarlandı.
- [x] Admin paneli dosya sisteminden veritabanına taşındı.
- [x] "Force Dynamic" ayarı ile anlık güncelleme sağlandı.
- [x] Kod içindeki `localhost` referansları temizlendi.

## 2. Vercel Ortam Değişkenleri (Environment Variables)

Projenizin Vercel'de çalışması için aşağıdaki değişkenlerin **Vercel Project Settings -> Environment Variables** kısmına eklenmesi ŞARTTIR.

| Key | Value (Değer) | Açıklama |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` (Pooled) | Neon DB'den (Pooled Connection) aldığınız bağlantı adresi. |
| `DIRECT_URL` | `postgresql://...` (Direct) | Neon DB'den (Direct Connection) aldığınız bağlantı adresi. |

> **Not:** `NEXT_PUBLIC_APP_URL` gibi değişkenlere ihtiyacınız YOKTUR, sistem otomatik olarak çalışacak şekilde ayarlandı.

## 3. Deployment (Yayınlama)

Kodlarınız şu an Vercel'e uyumlu. Tek yapmanız gereken değişiklikleri göndermek:

1.  Terminale şu komutları yazın (eğer son değişiklikleri göndermediyseniz):
    ```bash
    git add .
    git commit -m "chore: prepare for production"
    git push
    ```

2.  Vercel Dashboard'a gidin.
3.  Projenize girin -> **Deployments** sekmesi.
4.  Son commit'inizin yanındaki üç noktaya tıklayıp **Redeploy** deyin.
    - **"Use existing Build Cache" seçeneğinin KAPALI (işaretsiz) olduğundan emin olun.**

## 4. Veritabanı Kurulumu (İlk Sefer İçin)

Deployment bittiğinde siteniz açılacak ama içi boş olabilir. Veritabanını doldurmak için **Lokal Bilgisayarınızdan** şu komutu çalıştırın:

```bash
# Bu komut Vercel'deki veritabanına örnek verileri basar
npx prisma db seed
```
*(Bunun çalışması için yerel `.env` dosyanızda Vercel'deki aynı `DATABASE_URL` yazıyor olmalıdır).*

## 5. Artık Localhost'a İhtiyacınız Yok

Artık sitenizi yönetmek için:
- **Site:** `https://engisafe-web.vercel.app` (veya kendi domaininiz)
- **Admin Paneli:** `https://engisafe-web.vercel.app/admin`

Her şey bulutta (Vercel + Neon) çalışıyor. Bilgisayarınızı kapatsanız bile site çalışmaya devam eder.
