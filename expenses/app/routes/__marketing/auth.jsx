import authStyles from '~/styles/auth.css';
import AuthForm from '~/components/auth/auth-form';

// "Auth" is also inside __marketing, technically it
// doesn't need the marketing styles, but it needs
// marketing "header"
export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const { searchParams } = new URL(request.url);
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  if (authMode === 'login') {
    // login logic
  } else {
    // signup login
  }

  return null;
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
