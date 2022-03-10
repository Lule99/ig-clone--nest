import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({namespace:'/chat'})
export class ChatGateway implements OnGatewayInit {

  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    //ovde potencijalno ocistiti sve sobe?
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, room: string, message: string }) {
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string ) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string ) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
