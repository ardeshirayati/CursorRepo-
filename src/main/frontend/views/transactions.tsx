import { useEffect, useState } from 'react';
import { Grid, GridColumn, Icon } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { TransactionEndpoint } from 'Frontend/generated/endpoints.js';
import type Transaction from 'Frontend/generated/org/pdr/cbaas/sbank/ui/dto/Transaction';

export const config: ViewConfig = { menu: { title: 'transactions' } };

export default function TransactionsView() {
  const [items, setItems] = useState<Transaction[]>([]);
  useEffect(() => {
    TransactionEndpoint.listTransactions('acc-1001', 0, 20).then((p) => {
      const arr = (p?.items ?? []).filter((it): it is Transaction => !!it);
      setItems(arr);
    });
  }, []);

  return (
    <Grid items={items} theme="no-border row-stripes" style={{ width: '100%' }}>
      <GridColumn path="bookingDate" header="Date" />
      <GridColumn header="Description" renderer={({ item }) => {
        const amount = (item as any)?.amount?.amount ?? 0;
        const isPositive = amount >= 0;
        const icon = isPositive ? 'vaadin:arrow-down' : 'vaadin:arrow-up'; // incoming=down (credit), outgoing=up (debit)
        const iconColor = isPositive ? 'text-green-600' : 'text-red-600';
        return (
          <span className="inline-flex items-center gap-2">
            <Icon icon={icon} className={iconColor} />
            {(item as any)?.description ?? ''}
          </span>
        );
      }} />
      <GridColumn header="Amount" renderer={({ item }) => {
        const amount = (item as any)?.amount?.amount ?? 0;
        const isPositive = amount >= 0;
        const color = isPositive ? 'text-green-600' : 'text-red-600';
        const sign = isPositive ? '+' : '';
        return <span className={`${color} font-semibold`}>{sign}{amount}</span>;
      }} />
    </Grid>
  );
}