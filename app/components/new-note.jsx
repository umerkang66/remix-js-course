import {
  Form,
  useTransition as useNavigation,
  useActionData,
} from '@remix-run/react';
import styles from './new-note.css';

export default function NewNote() {
  // technically, we don't have to add the action prop, because this NewNote is actually being used in notes file in app folder
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  // These data hooks, can also be called in other components, (other than page components)
  const errData = useActionData();

  return (
    <Form method="post" action="/notes" id="note-form">
      {errData && <p style={{ color: '#cc0000' }}>{errData.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
