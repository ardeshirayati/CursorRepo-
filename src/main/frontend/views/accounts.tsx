import { useEffect, useState } from 'react';
import { Card, VerticalLayout } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AccountEndpoint } from 'Frontend/generated/endpoints.js';
import { t } from 'Frontend/i18n';

export const config: ViewConfig = { menu: { title: 'accounts' } };

export default function AccountsView() {
  const [accounts, setAccounts] = useState<any[]>([]);
  useEffect(() => { AccountEndpoint.listAccounts().then(setAccounts); }, []);

  return (
    <VerticalLayout style={{ gap: 'var(--lumo-space-m)', padding: 'var(--lumo-space-l)' }}>
      {accounts.map((a) => (
        <Card key={a.id} style={{ padding: 'var(--lumo-space-m)' }}>
          <div style={{ fontWeight: 600 }}>{a.title}</div>
          <div style={{ opacity: 0.8 }}>{a.iban}</div>
          <div style={{ marginTop: '0.5rem' }}>{a.balance.amount} {a.balance.currency}</div>
        </Card>
      ))}
    </VerticalLayout>
  );
}