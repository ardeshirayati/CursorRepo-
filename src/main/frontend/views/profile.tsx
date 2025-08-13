import { useEffect, useState } from 'react';
import { TextField, VerticalLayout } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { ProfileEndpoint } from 'Frontend/generated/endpoints.js';

export const config: ViewConfig = { menu: { title: 'profile' } };

export default function ProfileView() {
  const [p, setP] = useState<any | null>(null);
  useEffect(() => { ProfileEndpoint.me().then(setP); }, []);
  if (!p) return null;
  return (
    <VerticalLayout style={{ gap: 'var(--lumo-space-m)', padding: 'var(--lumo-space-l)', maxWidth: 520 }}>
      <TextField label="User ID" value={p.userId} readOnly />
      <TextField label="Name" value={p.displayName} readOnly />
      <TextField label="Locale" value={p.preferredLocale} readOnly />
      <TextField label="Roles" value={(p.roles || []).join(', ')} readOnly />
    </VerticalLayout>
  );
}