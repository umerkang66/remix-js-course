// "Filename" and "Folder" should have the same name
// This will allow to add a layout component, that
// doesn't add a path in url

import { Outlet } from '@remix-run/react';

import marketingStyles from '~/styles/marketing.css';
import MainHeader from '~/components/navigation/main-header';
import { getUserFromSession } from '~/data/auth.server';

// It is not "__marketing/pricing", instead it is the
// same "/pricing", and same with the "index" page

// PATHLESS LAYOUTS
export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export function loader({ request }) {
  return getUserFromSession(request);
}

// This will shared by every component, that is in
// the "__marketing" file
export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }];
}
