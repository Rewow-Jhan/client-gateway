import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AUTH_SERVICE } from "src/config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class UsersService{
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}
    
  async validateGoogleUser(googleUser: CreateUserDto){
    try {
      const user = await firstValueFrom(
         this.authClient.send('login_with_google', googleUser)
      )
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}