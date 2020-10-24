import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/loginDto.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Exceptions } from './exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async doLogin(loginDto: LoginDto | any) {
    const login: any = { email: '', password: '', code: '', roles: ['All'] };
    Object.assign(login, loginDto);
    console.log(loginDto);
    const user = await this.usersService.findOneByEmailAndPassword(
      login.username,
      login.password,
    );
    if (!user) {
      throw Exceptions.USER_NOT_FOUND;
    }

    const payload = { username: user.name, sub: user.email, code: user._id };
    return {
      name: user.name,
      code: user._id,
      token: await this.jwtService.sign(payload),
    };
  }
}
