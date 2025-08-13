import { useEffect, useState } from 'react';
import { Grid } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { TransactionEndpoint } from 'Frontend/generated/endpoints.js';

export const config: ViewConfig = { menu: { title: 'transactions' } };

export default function TransactionsView() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { TransactionEndpoint.listTransactions('acc-1001', 0, 20).then((p) => setItems(p.items)); }, []);

  return (
    <Grid items={items} style={{ width: '100%' }}>
      <Grid.Column path="bookingDate" header="Date" />
      <Grid.Column path="description" header="Description" />
      <Grid.Column path="amount.amount" header="Amount" />
    </Grid>
  );
}