import { sendEmail } from "@/lib/email";
import { MagicLinkTemplate } from "../components/magic-link-template";

async function sendMagicLinkEmail(email: string, token: string) {
  const url = `${process.env.APP_URL}/api/auth/login?token=${token}&email=${email}`;
  return sendEmail({
    to: email,
    subject: "Your access to Poketwitter",
    content: <MagicLinkTemplate name={email} url={url} />,
  });
}

export { sendMagicLinkEmail };
