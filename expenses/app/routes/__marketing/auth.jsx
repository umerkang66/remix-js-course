import authStyles from '~/styles/auth.css';
import AuthForm from '~/components/auth/auth-form';

// "Auth" is also inside __marketing, technically it
// doesn't need the marketing styles, but it needs
// marketing "header"
export default function AuthPage() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
