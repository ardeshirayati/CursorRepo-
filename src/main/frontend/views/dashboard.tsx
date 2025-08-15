import { Card } from '@vaadin/react-components';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { title: 'dashboard' },
};

export default function DashboardView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl shadow-card bg-gradient-to-r from-brand-700 to-cyan-500 text-white p-6">
        <h3 className="m-0 text-xl font-semibold">Welcome back</h3>
        <div className="opacity-90">Your quick banking overview</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-card" style={{ padding: 'var(--lumo-space-m)', minHeight: '140px' }}>Account summary</Card>
        <Card className="rounded-xl shadow-card" style={{ padding: 'var(--lumo-space-m)', minHeight: '140px' }}>Recent transactions</Card>
        <Card className="rounded-xl shadow-card" style={{ padding: 'var(--lumo-space-m)', minHeight: '140px' }}>Quick actions</Card>
      </div>
    </div>
  );
}