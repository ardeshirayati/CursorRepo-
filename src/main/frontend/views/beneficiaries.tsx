import { useEffect, useState } from 'react';
import { Grid } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { BeneficiaryEndpoint } from 'Frontend/generated/endpoints.js';

export const config: ViewConfig = { menu: { title: 'beneficiaries' } };

export default function BeneficiariesView() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { BeneficiaryEndpoint.listBeneficiaries().then(setItems); }, []);
  return (
    <Grid items={items} style={{ width: '100%' }}>
      <Grid.Column path="name" header="Name" />
      <Grid.Column path="iban" header="IBAN" />
      <Grid.Column path="bankName" header="Bank" />
    </Grid>
  );
}