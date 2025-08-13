import { Card, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { title: 'dashboard' },
};

export default function DashboardView() {
  return (
    <VerticalLayout style={{ width: '100%', padding: 'var(--lumo-space-l)', gap: 'var(--lumo-space-l)' }}>
      <HorizontalLayout style={{ gap: 'var(--lumo-space-l)', flexWrap: 'wrap' }}>
        <Card style={{ flex: '1 1 280px', minHeight: '140px', padding: 'var(--lumo-space-m)' }}>Account summary</Card>
        <Card style={{ flex: '1 1 280px', minHeight: '140px', padding: 'var(--lumo-space-m)' }}>Recent transactions</Card>
        <Card style={{ flex: '1 1 280px', minHeight: '140px', padding: 'var(--lumo-space-m)' }}>Quick actions</Card>
      </HorizontalLayout>
    </VerticalLayout>
  );
}