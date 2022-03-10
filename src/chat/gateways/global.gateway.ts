import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import Constants from 'src/helpers/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';

@WebSocketGateway({
  namespace: Constants.sockets.global,
  cors: {
    origin: Constants.client,
    credentials: true,
  },
})
export class GlobalGateway {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('login')
  login(client: any, username: any) {
    
    client.join(username);
  }

  @SubscribeMessage('call')
  call(client: any, msg: { caller: string; usernames: string[] }) {
    const room = this.generateRoom();
    const caller = msg.caller;

    msg.usernames.map((user) => {
      this.server.to(user).emit('callPending', { caller, room });
    });

    client.emit('redirectToRoom', room);
  }

  generateRoom() {
    const id = v4();
  }

  async getUserFromUsername(username: string) {
    const profile = await this.prisma.user
      .findFirst({
        where: {
          username: username,
        },
      })
      .profile();
  }
}
