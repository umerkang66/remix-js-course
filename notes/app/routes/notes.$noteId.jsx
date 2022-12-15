import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getNoteById } from '~/data/notes';
import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>

      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const id = params.noteId;
  const note = await getNoteById(id);

  if (!note) {
    // We haven't specified the CatchBoundary, so
    // the root CatchBoundary will be triggered
    throw json({ message: 'Note is not found' }, { status: 404 });
  }

  // technically this is wrapped in "Response" obj
  // by "json" function
  return note;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export function meta({ data }) {
  // We can also access the "params" here
  // This data holds the properties, that are returned by loader
  return { title: data.title + ' | Notes' };
}
