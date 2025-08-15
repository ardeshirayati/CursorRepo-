import { AppLayout, DrawerToggle, Icon, ProgressBar, SideNav, SideNavItem, Select, Checkbox } from '@vaadin/react-components';
import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Signal, signal, effect } from '@vaadin/hilla-react-signals';
import { applyLocaleDirection, applyTheme, darkMode, locale, t } from 'Frontend/i18n';

const vaadin = window.Vaadin as { documentTitleSignal: Signal<string> };
vaadin.documentTitleSignal = signal('');

effect(() => { document.title = vaadin.documentTitleSignal.value; });
effect(() => { applyLocaleDirection(); });
effect(() => { applyTheme(); });

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? '';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { vaadin.documentTitleSignal.value = currentTitle; });

  return (
    <AppLayout primarySection="drawer" theme={darkMode.value ? 'dark' : undefined}>
      <div slot="drawer" className="flex flex-col justify-between h-full p-m bg-slate-50 dark:bg-slate-900">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0 font-semibold text-brand-700 dark:text-brand-100">{t('appTitle')}</h1>
          <Select
            label={t('language')}
            style={{ width: '100%' }}
            value={locale.value}
            onValueChanged={(e) => (locale.value = e.detail.value as any)}
            items={[{ label: 'فارسی', value: 'fa' }, { label: 'English', value: 'en' }, { label: 'العربیة', value: 'ar' }]}
          />
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {createMenuItems().map(({ to, title }) => (
              <SideNavItem path={to} key={to}>
                {t(title || '')}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

            <div slot="navbar" className="flex items-center gap-3 px-4 h-14 bg-gradient-to-r from-brand-700 to-cyan-500 text-white shadow">
        <DrawerToggle aria-label="Menu toggle" />
        <h2 className="text-base font-semibold m-0">{vaadin.documentTitleSignal}</h2>
        <div className="ms-auto flex items-center gap-3">
          <Checkbox
            checked={darkMode.value}
            onCheckedChanged={(e: CustomEvent) => (darkMode.value = (e as any).detail.value)}
            aria-label={t('theme')}
          >
            <Icon icon="vaadin:moon-o" />
          </Checkbox>
        </div>
      </div>

      <Suspense fallback={<ProgressBar indeterminate className="m-0" />}> 
        <section className="view max-w-7xl mx-auto">
          <Outlet />
        </section>
      </Suspense>
    </AppLayout>
  );
}
