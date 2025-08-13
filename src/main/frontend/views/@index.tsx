import { LoginForm } from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import { AuthEndpoint } from 'Frontend/generated/endpoints.js';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { t } from 'Frontend/i18n';

export const config: ViewConfig = {
  menu: { title: 'login' },
};

export default function LoginView() {
  const error = useSignal(false);

  return (
    <LoginForm
      i18n={{
        header: { title: t('login'), description: '' },
        form: { username: 'Username', password: 'Password', submit: t('login') },
        errorMessage: { title: t('loginError'), message: t('loginError'), username: '', password: '' },
        additionalInformation: '',
      }}
      error={error.value}
      noForgotPassword
      onLogin={async (e) => {
        try {
          await AuthEndpoint.login(e.detail.username, e.detail.password);
          window.location.assign('/dashboard');
        } catch {
          error.value = true;
        }
      }}
    />
  );
}
