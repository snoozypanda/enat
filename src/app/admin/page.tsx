import AdminPage from '@/components/admin-page';
import { ErrorBoundary } from '@/components/error-boundary';

export default function AdminRoute() {
  return <ErrorBoundary resetKey="/admin"><AdminPage /></ErrorBoundary>;
}
