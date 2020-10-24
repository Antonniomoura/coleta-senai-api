import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {
  }

  @Get()
  @UseGuards()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() req): Promise<any> {
    return await this.authService.doLogin(req);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('api/me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('uploads/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    },
    ),
  )
  uploadAvatar(@UploadedFile() file) {
    return file;
  }
}
