import { signal } from '@vaadin/hilla-react-signals';

type Locale = 'fa' | 'en' | 'ar';

export const locale = signal<Locale>('fa');
export const darkMode = signal<boolean>(false);

export const messages: Record<Locale, Record<string, string>> = {
  fa: {
    appTitle: 'سامانه اینترنت بانک',
    login: 'ورود',
    dashboard: 'داشبورد',
    language: 'زبان',
    theme: 'حالت شب',
  },
  en: {
    appTitle: 'Internet Banking',
    login: 'Login',
    dashboard: 'Dashboard',
    language: 'Language',
    theme: 'Dark mode',
  },
  ar: {
    appTitle: 'الخدمات المصرفية عبر الإنترنت',
    login: 'تسجيل الدخول',
    dashboard: 'لوحة التحكم',
    language: 'اللغة',
    theme: 'الوضع الليلي',
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