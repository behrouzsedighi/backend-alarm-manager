import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_JWT,
      });
      const dataDecode = this.appService.decryptAES256(payload?.data, payload?.iv);
      const JsonDataUser = JSON.parse(dataDecode);

      const UserData = await this.usersService.findUserById(JsonDataUser?._id);
      if (UserData) {
        if (UserData?.password !== JsonDataUser?.password) {
          throw new UnauthorizedException();
        }
        request['user'] = UserData;
      } else {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
