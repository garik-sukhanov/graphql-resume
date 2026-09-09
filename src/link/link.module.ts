import { Module } from '@nestjs/common';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';

@Module({
  providers: [LinkResolver, LinkService],
  exports: [LinkService],
})
export class LinkModule {}
