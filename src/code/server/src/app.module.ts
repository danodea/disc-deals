import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WantsController } from './wants/wants.controller';

@Module({
  imports: [],
  controllers: [AppController, WantsController],
  providers: [AppService],
})
export class AppModule {}
