# تصمیم‌ها و معماری cbaas.sbank.ui

- نام پروژه: `cbaas.sbank.ui`
- پکیج پایه: `org.pdr.cbaas.sbank.ui`
- Java: 21
- لانچر: Spring Boot 3 (embedded Tomcat)
- UI: Vaadin Hilla + React
- نسخه‌ها: Spring Boot 3.5.x، Vaadin/Hilla 24.8.x

## امنیت و نشست
- احراز هویت سمت سرور با Spring Security و مدیریت نشست (JSESSIONID، HttpOnly).
- لاگین: `AuthEndpoint.login(username,password)` به REST API بیرونی POST می‌کند.
- JWT برگشتی فقط در سرور (Session) نگهداری می‌شود و به React داده نمی‌شود.
- عدم استفاده از `localStorage`/`sessionStorage` برای توکن.
- CSP سخت‌گیرانه: فقط `self` و آدرس API تعریف‌شده در `csp.connect-src` مجاز است. هیچ منبع خارجی (CDN و …) لود نمی‌شود.

## پیکربندی API بیرونی
- `backend.api.base-url` (پیش‌فرض: `http://localhost:9000`)
- `backend.api.auth-path` (پیش‌فرض: `/auth/login`)

## بین‌المللی‌سازی و تم
- زبان‌ها: فارسی (fa)، انگلیسی (en)، عربی (ar)
- تغییر خودکار `dir` با تغییر زبان (RTL برای fa/ar، LTR برای en)
- Dark/Night mode با سوییچ در لِی‌اوت

## PWA
- فعال با `@PWA`، فایل‌های محلی: `offline.html`, `manifest.webmanifest`
- آیکون‌ها: در `META-INF/resources/images/icons/` (لطفاً `icon-192.png` و `icon-512.png` را جایگزین کنید)

## UI/UX و ریسپانسیو
- طراحی مدرن و ساده با تاکید بر ریسپانسیو (مخصوص موبایل)
- بدون بارگذاری هیچ فایل JS/CSS از بیرون (همه منابع محلی)

## ساختار فعلی
- Endpoints:
  - `AuthEndpoint` (login/logout)
- Views:
  - `Login` (فرم ورود) → ریدایرکت به `/dashboard`
  - `Dashboard` (placeholder واکنش‌گرا)

## گام‌های بعدی (پس از دریافت Swagger/OpenAPI)
- تعریف DTOها و Endpointهای سروری برای: Profile/Accounts/Transactions/Transfers
- هم‌راستا کردن قرارداد login با API (محل JWT و ساختار UserInfo)
- توسعه صفحات: حساب‌ها، تراکنش‌ها (فیلتر/صفحه‌بندی)، انتقال وجه، مخاطبین/شبا
- محافظت مسیرها براساس نقش‌ها (`UserInfo.roles`)
- تنظیم `csp.connect-src` متناسب با هاست/پورت نهایی API

## دیپلوی و DevOps
- امکان انتقال ریپو به GitLab (Deploy Key مشابه)
- پیشنهاد: Branch protection روی `main` و CI (mvn verify + frontend build)

---
این سند جهت جایگزینی تاریخچه چت برای تصمیم‌های کلیدی نگه‌داری می‌شود. هر تغییر معماری/سیاست امنیتی در این فایل ثبت شود.