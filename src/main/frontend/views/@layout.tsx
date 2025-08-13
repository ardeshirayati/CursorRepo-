import { AppLayout, DrawerToggle, ProgressBar, SideNav, SideNavItem, Select, Checkbox } from '@vaadin/react-components';
import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Signal, signal, effect } from '@vaadin/hilla-react-signals';
import { applyLocaleDirection, applyTheme, darkMode, locale, t } from 'Frontend/i18n';

const vaadin = window.Vaadin as {
  documentTitleSignal: Signal<string>;
};
vaadin.documentTitleSignal = signal('');
effect(() => {
  document.title = vaadin.documentTitleSignal.value;
});

effect(() => {
  applyLocaleDirection();
});

effect(() => {
  applyTheme();
});

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? '';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    vaadin.documentTitleSignal.value = currentTitle;
  });

  return (
    <AppLayout primarySection="drawer" theme={darkMode.value ? 'dark' : undefined}>
      <div slot="drawer" className="flex flex-col justify-between h-full p-m" style={{ minWidth: '240px' }}>
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">{t('appTitle')}</h1>
          <div className="flex items-center gap-s">
            <Select
              label={t('language')}
              style={{ width: '100%' }}
              value={locale.value}
              onValueChanged={(e) => (locale.value = e.detail.value as any)}
              items={[{ label: 'فارسی', value: 'fa' }, { label: 'English', value: 'en' }, { label: 'العربیة', value: 'ar' }]}
            />
            <Checkbox
              label={t('theme')}
              checked={darkMode.value}
              onCheckedChanged={(e) => (darkMode.value = e.detail.value)}
            />
          </div>
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {createMenuItems().map(({ to, title }) => (
              <SideNavItem path={to} key={to}>
                {t(title || '')}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {vaadin.documentTitleSignal}
      </h2>

      <Suspense fallback={<ProgressBar indeterminate className="m-0" />}>
        <section className="view" style={{ padding: 'var(--lumo-space-m)' }}>
          <Outlet />
        </section>
      </Suspense>
    </AppLayout>
  );
}
