import { registerAs } from "@nestjs/config";
import { envs } from "./envs";

export default registerAs('googleOauth', () => ({
  clientId: envs.googleClientId,
  clientSecret: envs.googleClientSecret,
  callbackUrl: envs.googleCallbackUrl,
}))