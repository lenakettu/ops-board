import { createBrowserRouter } from 'react-router-dom';

import { CustomerDetailsPage } from '@/pages/customer-details/ui/CustomerDetailsPage';
import { CustomersPage } from '@/pages/customers/ui/CustomersPage';
import { OverviewPage } from '@/pages/overview/ui/OverviewPage';
import { AppLayout } from '@/widgets/app-layout/ui/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'customers',
        element: <CustomersPage />,
      },
      {
        path: 'customers/:customerId',
        element: <CustomerDetailsPage />,
      },
    ],
  },
]);
