import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(client);
    console.log(payload);
    console.log('WellCome to Chat App');
    return 'Hello world!';
  }

  handleConnection(client: any): void {
    console.log('Client connected');
  }
}
