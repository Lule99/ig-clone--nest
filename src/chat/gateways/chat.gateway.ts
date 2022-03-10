import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Constants from 'src/helpers/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  namespace: Constants.sockets.chat,
  cors: {
    origin: Constants.client,
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayInit {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    //ovde potencijalno ocistiti sve sobe?
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.getUserFromUsername(message.sender).then((res) => {
      const { username, profilePicture } = res;
      const msg = { username, profilePicture, text: message.message, dateTime: new Date() };
      this.server.to(message.room).emit('chatToClient', msg);
    });
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  async getUserFromUsername(username: string) {
    const profile = await this.prisma.user
      .findFirst({
        where: {
          username: username,
        },
      })
      .profile();

    return { username, profilePicture: profile.profilePicture };
  }
}
