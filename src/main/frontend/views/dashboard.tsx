import { Card, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { title: 'dashboard' },
};

export default function DashboardView() {
  return (
    <div className="app-section">
      <div className="app-hero">
        <h3 style={{ margin: 0 }}>Welcome back</h3>
        <div style={{ opacity: 0.9 }}>Your quick banking overview</div>
      </div>
      <div className="app-cards">
        <Card className="app-card" style={{ minHeight: '140px', padding: 'var(--lumo-space-m)' }}>Account summary</Card>
        <Card className="app-card" style={{ minHeight: '140px', padding: 'var(--lumo-space-m)' }}>Recent transactions</Card>
        <Card className="app-card" style={{ minHeight: '140px', padding: 'var(--lumo-space-m)' }}>Quick actions</Card>
      </div>
    </div>
  );
}