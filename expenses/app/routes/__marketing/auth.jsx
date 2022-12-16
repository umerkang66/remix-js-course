import authStyles from '~/styles/auth.css';

import AuthForm from '~/components/auth/auth-form';
import { validateCredentials } from '~/data/validation.server';
import { login, signup } from '~/data/auth.server';

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

  try {
    validateCredentials(credentials);
  } catch (err) {
    return err;
  }

  try {
    if (authMode === 'login') {
      // login
      return await login(credentials);
    } else {
      // signup
      return await signup(credentials);
    }
  } catch (err) {
    if (err.status === 422 || err.status === 401)
      return { credentials: err.message };
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
