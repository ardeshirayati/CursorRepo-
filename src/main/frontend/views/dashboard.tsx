import { Card, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  path: '/dashboard',
  menu: { title: 'Dashboard' },
};

export default function DashboardView() {
  return (
    <VerticalLayout style={{ width: '100%', padding: 'var(--lumo-space-m)' }}>
      <HorizontalLayout style={{ gap: 'var(--lumo-space-m)', flexWrap: 'wrap' }}>
        <Card style={{ flex: '1 1 280px' }}>Account summary</Card>
        <Card style={{ flex: '1 1 280px' }}>Recent transactions</Card>
        <Card style={{ flex: '1 1 280px' }}>Quick actions</Card>
      </HorizontalLayout>
    </VerticalLayout>
  );
}