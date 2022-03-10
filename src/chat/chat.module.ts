import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { GlobalGateway } from './gateways/global.gateway';

@Module({
  providers: [ChatGateway, GlobalGateway]
})
export class ChatModule {}
