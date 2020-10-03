import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();

  }
  @Get('uploads/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }
  //
  // @Post('uploads')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: any): Promise<any> {
  //   console.log(file)
  //   // return await this.uploadService.uploadFile(file)
  // }
  @Post('uploads')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
    )

  )
  uploadAvatar(@UploadedFile() file) {
    return file
  }
}
