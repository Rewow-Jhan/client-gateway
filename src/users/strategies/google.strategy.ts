import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauth from "src/config/google-oauth";
import { UsersService } from "../user.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauth.KEY) 
    private googleConfiguration: ConfigType<typeof googleOauth>,
    private authService: UsersService,
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const user = await this.authService.validateGoogleUser(
      {
        email: profile.emails[0].value,
        name: profile.name.givenName + ' ' + profile.name.familyName, 
      }
    );

    done(null, user);
  }
}