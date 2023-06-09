import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { db } from "./db";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string | Buffer,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

// create JWT
export const createJWT = (user: User) => {
  // return jwt.sign({id: user.id}, 'cookies' )
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({
    user: { id: user.id, email: user.email },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

// validate JWT
export const validateJWT = async (jwt: string | Uint8Array) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.user as User;
};

// get JWT from cookie
export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME as string) as RequestCookie;

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
