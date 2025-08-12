import { Button, LoginForm } from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import { AuthEndpoint } from 'Frontend/generated/endpoints.js';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { title: 'Login' },
};

export default function LoginView() {
  const error = useSignal(false);

  return (
    <LoginForm
      error={error.value}
      noForgotPassword
      onLogin={async (e) => {
        try {
          await AuthEndpoint.login(e.detail.username, e.detail.password);
          window.location.href = '/dashboard';
        } catch (err) {
          error.value = true;
        }
      }}
    />
  );
}
