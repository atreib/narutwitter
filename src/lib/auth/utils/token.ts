import * as crypto from "crypto";

const SECRET_KEY = process.env.AUTH_SECRET_KEY;

export async function generateToken() {
  const unsignedToken = crypto.randomBytes(32).toString("hex");
  const hmac = crypto.createHmac("sha256", SECRET_KEY!);
  hmac.update(unsignedToken);
  const signedToken = hmac.digest("hex");
  return `${unsignedToken}.${signedToken}`;
}

export async function verifyToken(token: string) {
  const [randomPart, signature] = token.split(".");
  const hmac = crypto.createHmac("sha256", SECRET_KEY!);
  hmac.update(randomPart);
  const expectedSignature = hmac.digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
