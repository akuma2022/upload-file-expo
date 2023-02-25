import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: (req, file, next) => {
          next(null, 'uploads');
        },
        filename: (req, file, next) => {
          next(
            null,
            new Date().toISOString().replace(/:/g, '-') +
              '-' +
              file.originalname,
          );
        },
      }),
    }),
  )
  getHello(): string {
    return this.appService.getHello();
  }
}
