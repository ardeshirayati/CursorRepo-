import { Button, TextArea, TextField } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { TransferEndpoint } from 'Frontend/generated/endpoints.js';

export const config: ViewConfig = { menu: { title: 'transfers' } };

export default function TransfersView() {
  const toIban = useSignal('');
  const amount = useSignal('100000');
  const description = useSignal('');

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-card bg-white/70 dark:bg-slate-800/50 backdrop-blur">
      <div className="grid gap-4">
        <TextField label="IBAN" value={toIban.value} onValueChanged={(e) => (toIban.value = e.detail.value)} />
        <TextField label="Amount (IRR)" value={amount.value} onValueChanged={(e) => (amount.value = e.detail.value)} />
        <TextArea label="Description" value={description.value} onValueChanged={(e) => (description.value = e.detail.value)} />
        <Button theme="primary" className="transition-transform hover:-translate-y-0.5" onClick={async () => {
          await TransferEndpoint.submitTransfer({ fromAccountId: 'acc-1001', toIban: toIban.value, amount: { currency: 'IRR', amount: Number(amount.value) }, description: description.value });
          alert('Submitted');
        }}>Submit</Button>
      </div>
    </div>
  );
}