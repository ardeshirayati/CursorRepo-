import { useEffect, useState } from 'react';
import { Card, VerticalLayout } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AccountEndpoint } from 'Frontend/generated/endpoints.js';
import type Account from 'Frontend/generated/org/pdr/cbaas/sbank/ui/dto/Account';

export const config: ViewConfig = { menu: { title: 'accounts' } };

export default function AccountsView() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
    AccountEndpoint.listAccounts().then((res) => setAccounts((res as Account[] | undefined) ?? []));
  }, []);

  return (
    <VerticalLayout style={{ gap: 'var(--lumo-space-m)', padding: 'var(--lumo-space-l)' }}>
      {accounts.map((a) => (
        <Card key={a.id} className="rounded-xl shadow-card hover:-translate-y-0.5 transition-transform" style={{ padding: 'var(--lumo-space-m)' }}>
          <div className="text-base font-semibold text-slate-800 dark:text-slate-100">{a.title}</div>
          <div className="text-slate-500 dark:text-slate-400">{a.iban}</div>
          <div className="mt-2 flex items-baseline gap-2">
            {(() => {
              const value = a.balance?.amount ?? 0;
              const isPositive = value >= 0;
              const color = isPositive ? 'text-green-600' : 'text-red-600';
              const sign = isPositive ? '' : '-';
              return (
                <>
                  <span className={`text-lg font-bold ${color}`}>{sign}{Math.abs(value)}</span>
                  <span className="text-slate-500 dark:text-slate-400">{a.balance?.currency}</span>
                </>
              );
            })()}
          </div>
        </Card>
      ))}
    </VerticalLayout>
  );
}