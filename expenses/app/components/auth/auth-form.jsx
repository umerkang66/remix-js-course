import {
  Form,
  Link,
  useSearchParams,
  useTransition as useNavigation,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

export default function AuthForm() {
  // get the query params from the url
  // we can also set the params, by the second value
  // after the searchParams
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get('mode') || 'login';

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
  const toggleBtnCaption =
    authMode === 'login' ? 'Create a new user' : 'Login in with existing user';

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitBtnCaption}
        </button>
        <Link to={`?mode=${authMode === 'login' ? 'signup' : 'login'}`}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
}
