import { Module } from '@nestjs/common';
import { ApisService } from './apis.service';
import { ApisController } from './apis.controller';

@Module({
  providers: [ApisService],
  controllers: [ApisController]
})
export class ApisModule {}
