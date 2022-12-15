import { json, redirect } from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/new-note';
import NoteList, { links as noteListLinks } from '~/components/note-list';
import { getStoredNotes, storeNotes } from '~/data/notes';

export default function Notes() {
  // data will be json parsed
  const notes = useLoaderData();

  const jsx = (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );

  return jsx;
}

// THIS ACTS LIKE GET SERVER SIDE PROPS
export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || !notes.length) {
    // This will trigger this "CatchBoundary"
    // first arg is data to be generated as "res"
    // generates the default node js Response Object
    throw json({ message: 'Could not find any notes' }, { status: 404 });
  }

  // this result will be wrapped by the js response object, json func will do that, it will stringify it, convert into response, and send it
  // if we just simply return the raw data, remix will use the json func
  return notes;
}

// THIS ACTS LIKE API ROUTE
export async function action({ request }) {
  // if "get" request hit the route, the component will be sent, if non-get request will hit the route, this action will be run
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  const noteData = { title, content };

  // validation
  if (noteData.title.trim().length < 5 || noteData.content.trim().length < 5) {
    const message = 'Invalid title or content - Must be atLeast 5 characters';
    return { message };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // this will trigger the loader call, if we are using Form (instead of "form"), this redirect will happened using client-side-routing, and again loader will be run again, but page will not be loaded
  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
  return { title: 'All notes', description: 'Manage your notes with ease' };
}

export function CatchBoundary() {
  // This will be rendered if the response is
  // "THROWN" by "json" function
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || 'Data not found';

  return (
    <main>
      <div className="error">
        <h1>CatchBoundary: {message}</h1>
      </div>
      <NewNote />
    </main>
  );
}

export function ErrorBoundary({ error }) {
  // This will be returned instead of content that
  // is returned from this page, if any error occurs
  // other that "json" function
  return (
    <main className="error">
      <h1>ErrorBoundary: An error related to your notes occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">Home Page</Link>
      </p>
    </main>
  );
}
