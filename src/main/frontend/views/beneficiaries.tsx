import { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { BeneficiaryEndpoint } from 'Frontend/generated/endpoints.js';
import type Beneficiary from 'Frontend/generated/org/pdr/cbaas/sbank/ui/dto/Beneficiary';

export const config: ViewConfig = { menu: { title: 'beneficiaries' } };

export default function BeneficiariesView() {
  const [items, setItems] = useState<Beneficiary[]>([]);
  useEffect(() => {
    BeneficiaryEndpoint.listBeneficiaries().then((res) => setItems((res as Beneficiary[] | undefined) ?? []));
  }, []);
  return (
    <Grid items={items} theme="no-border row-stripes" style={{ width: '100%' }}>
      <GridColumn path="name" header="Name" />
      <GridColumn path="iban" header="IBAN" />
      <GridColumn path="bankName" header="Bank" />
    </Grid>
  );
}