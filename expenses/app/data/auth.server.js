import { hash, compare } from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { prisma } from './database.server';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // in seconds
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);

  return redirect(redirectPath, {
    // this will set the cookie to the browser
    headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
  });
}

function generateError(message, status) {
  const error = new Error(message);
  error.status = status;
  // this is handled in auth.jsx, it is not being
  // send to the error boundary
  return error;
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw generateError(
      'A user with the provided email address exist already',
      422
    );
  }

  const hashedPassword = await hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return createUserSession(user.id, '/expenses');
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    throw generateError('Could not log you in', 401);
  }

  const correctPassword = await compare(password, existingUser.password);
  if (!correctPassword) {
    throw generateError('Could not log you in', 401);
  }

  // return the returned value from createUserSession
  // that is "redirect"
  return createUserSession(existingUser.id, '/expenses');
}

export async function getUserFromSession(request) {
  // remix will automatically check if this is valid cookie, by server "secret"
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const userId = session.get('userId');
  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request) {
  // remix will automatically check if this is valid cookie, by server "secret"
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  return redirect('/', {
    headers: {
      // this sets the fake cookie
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    // by throwing, everything after this will be canceled
    throw redirect('/auth?mode=login');
  }

  return userId;
}
