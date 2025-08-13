# IntelliJ Setup (Java 21 + GitLab via HTTPS)

## Prerequisites
- JDK 21 installed (Project SDK = 21)
- IntelliJ Ultimate or Community with Git plugin
- Personal Access Token (GitLab) with scopes: `write_repository` (و در صورت نیاز `api`)

## Open the project
1. IntelliJ → File → Open → پوشه `CursorRepo`
2. Project SDK: 21
3. Maven import: خودکار

## Configure Git remotes (already added here)
- HTTPS (done.ir): `https://gitlab.done.ir/cursor/cbaas.sbank.ui.git`
- HTTP (ham-sun): `http://gitlab.ham-sun.com/cbaas.sbank.ui.git`

اگر نیاز به اضافه‌کردن/تغییر دارید:
- Git → Manage Remotes → + → URL را وارد کنید

## Push to GitLab via HTTPS
1. Git → Push (یا VCS → Commit → Push)
2. Credential Prompt:
   - Username: کاربر GitLab شما
   - Password: Personal Access Token
   - گزینه "Remember" را فعال کنید

ترمینال (جایگزین):
```bash
git push -u gitlab-done-https main
# یا
git push -u gitlab-hamsun-http main
```

## Run/Debug
- Run → Edit Configurations… → Spring Boot → Main class: `org.pdr.cbaas.sbank.ui.Application`
- Java 21
- VM options (اختیاری برای dev):
  - `-Dspring.profiles.active=dev`
- برنامه روی پورت 8080 اجرا می‌شود، فرانت‌اند و Hilla به‌صورت خودکار سرو می‌شوند.

## Environment
- Backend API: `application.properties`
  - `backend.api.base-url=http://localhost:9000`
  - `backend.api.auth-path=/auth/login`
- CSP (اگر backend روی هاست/پورت دیگر است):
  - `csp.connect-src='self' http://<api-host>:<port>`

## Notes
- توکن و رمز را در IntelliJ securely ذخیره کنید.
- از HTTP فقط در شبکه‌های داخلی امن استفاده کنید؛ در غیر این صورت HTTPS توصیه می‌شود.
- تغییرات Hilla در `src/main/frontend/generated` تولیدی هستند، ویرایش نکنید.