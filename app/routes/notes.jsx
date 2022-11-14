import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/new-note";
import NoteList, { links as noteListLinks } from "~/components/note-list";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function Notes() {
  // data will be json parsed
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

// THIS ACTS LIKE GET SERVER SIDE PROPS
export async function loader() {
  const notes = await getStoredNotes();
  // this result will be wrapped by the js response object, json func will do that, it will stringify it, convert into response, and send it
  // if we just simply return the raw data, remix will use the json func
  return notes;
}

// THIS ACTS LIKE API ROUTE
export async function action({ request }) {
  // if get request hit the route, the component will be sent, if non-get request will hit the route, this action will be run
  const formData = await request.formData();

  // const noteData = Object.fromEntries(formData);
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  // validation
  if (noteData.title.trim().length < 5 || noteData.content.trim().length < 5) {
    const message = "Invalid title or content - Must be atleast 5 characters";
    return { message };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // this will trigger the loader call, if we are using Form (instead of "form"), this redirect will happend using client-side-routing, and again loader will be run again, but page will not be loaded
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
