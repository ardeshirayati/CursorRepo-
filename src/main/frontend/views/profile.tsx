import { useEffect, useState } from 'react';
import { TextField, VerticalLayout } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { ProfileEndpoint } from 'Frontend/generated/endpoints.js';
import type Profile from 'Frontend/generated/org/pdr/cbaas/sbank/ui/dto/Profile';

export const config: ViewConfig = { menu: { title: 'profile' } };

export default function ProfileView() {
  const [p, setP] = useState<Profile | null>(null);
  useEffect(() => { ProfileEndpoint.me().then(setP); }, []);
  if (!p) return null;
  return (
    <VerticalLayout style={{ gap: 'var(--lumo-space-m)', padding: 'var(--lumo-space-l)', maxWidth: 520 }}>
      <TextField label="User ID" value={p.userId} readonly />
      <TextField label="Name" value={p.displayName} readonly />
      <TextField label="Locale" value={p.preferredLocale} readonly />
      <TextField label="Roles" value={(p.roles || []).join(', ')} readonly />
    </VerticalLayout>
  );
}