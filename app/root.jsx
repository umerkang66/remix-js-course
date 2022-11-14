import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/styles/main.css";
import MainNavigation from "~/components/main-navigation";

export const meta = () => ({
  charset: "utf-8",
  title: "Remix Application",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  // add links that will be added in the head section
  // using the <Links /> that is added automatically
  // we have to add all the properties of the head links
  return [{ rel: "stylesheet", href: styles }];
}

export function ErrorBoundary({ error }) {
  // this is a special react component
  // if there is an error (on any page)
  // If this page is other page, so only "main" error content should be returned, because only content will be replaced, that is returned by that component
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occured</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occured!</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">Home Page</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
