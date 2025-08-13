import { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@vaadin/react-components';
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
    <Grid items={items} style={{ width: '100%' }}>
      <GridColumn path="bookingDate" header="Date" />
      <GridColumn path="description" header="Description" />
      <GridColumn path="amount.amount" header="Amount" />
    </Grid>
  );
}