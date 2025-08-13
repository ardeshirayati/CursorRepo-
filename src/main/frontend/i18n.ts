import { signal } from '@vaadin/hilla-react-signals';

type Locale = 'fa' | 'en' | 'ar';

export const locale = signal<Locale>('fa');
export const darkMode = signal<boolean>(false);

export const messages: Record<Locale, Record<string, string>> = {
  fa: {
    appTitle: 'سامانه اینترنت بانک',
    login: 'ورود',
    dashboard: 'داشبورد',
    accounts: 'حساب‌ها',
    transactions: 'تراکنش‌ها',
    transfers: 'انتقال وجه',
    beneficiaries: 'مخاطبین',
    profile: 'پروفایل',
    language: 'زبان',
    theme: 'حالت شب',
    loginError: 'نام کاربری یا رمز عبور نادرست است',
  },
  en: {
    appTitle: 'Internet Banking',
    login: 'Login',
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    transactions: 'Transactions',
    transfers: 'Transfers',
    beneficiaries: 'Beneficiaries',
    profile: 'Profile',
    language: 'Language',
    theme: 'Dark mode',
    loginError: 'Incorrect username or password',
  },
  ar: {
    appTitle: 'الخدمات المصرفية عبر الإنترنت',
    login: 'تسجيل الدخول',
    dashboard: 'لوحة التحكم',
    accounts: 'الحسابات',
    transactions: 'المعاملات',
    transfers: 'التحويلات',
    beneficiaries: 'المستفيدون',
    profile: 'الملف الشخصي',
    language: 'اللغة',
    theme: 'الوضع الليلي',
    loginError: 'اسم المستخدم أو كلمة المرور غير صحيحة',
  },
};

export function t(key: string): string {
  return messages[locale.value][key] ?? key;
}

export function applyLocaleDirection(): void {
  const isRtl = locale.value === 'fa' || locale.value === 'ar';
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
}

export function applyTheme(): void {
  document.documentElement.setAttribute('theme', darkMode.value ? 'dark' : '');
}