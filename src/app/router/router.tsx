import { createBrowserRouter } from 'react-router-dom';

import { CustomerDetailsPage } from '@/pages/customer-details';
import { CustomersPage } from '@/pages/customers';
import { OverviewPage } from '@/pages/overview';
import { AppLayout } from '@/widgets/app-layout';

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
