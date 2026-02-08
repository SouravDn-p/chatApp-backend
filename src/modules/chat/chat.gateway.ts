import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users = new Map<string, string>(); // socketId -> username

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    const name = this.users.get(client.id);
    if (name) {
      client.broadcast.to('room').emit('stopTyping', name);
      this.users.delete(client.id);
    }
    client.leave('room');
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, name: string) {
    this.users.set(client.id, name);
    client.join('room');
    client.broadcast.to('room').emit('roomNotice', name);
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(client: Socket, payload: any) {
    this.server.to('room').emit('chatMessage', payload);
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, name: string) {
    client.broadcast.to('room').emit('typing', name);
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(client: Socket, name: string) {
    client.broadcast.to('room').emit('stopTyping', name);
  }
}
