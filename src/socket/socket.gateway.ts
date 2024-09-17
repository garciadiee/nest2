import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { AuthService } from 'src/usuarios/auth.service';

@WebSocketGateway()
export class SocketGateway implements OnModuleInit {
  constructor(
    private readonly socketService: SocketService,
    private readonly auth: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  clients: { [key: string]: { socket: Socket } } = {};

  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {
      try {
        //Verificamos el token, para obtener la informacion
        const payload = await this.auth.verifyJwt(
          socket.handshake.headers.authorization,
        );

        const socketUsuario = this.socketService.getSocket(
          +socket.handshake.headers['usuario'],
        );

        if (socketUsuario) {
          socketUsuario.socket.emit(
            'El usuario: ${payload.nombre} establecio una conexion',
          );
        }
        
        console.log(payload);

        console.log('Usuario conectado con id: ${socket.id}');

      //Emitimos el mensaje de bienvenida
      this.server.emit(
        'welcome-message',
        'Bienvenidos a nuestro servidor, usuario ${socket.id}',
      );



      /**
       * @description
       * Almacenamos el socket del usuario, identificado por el id unico generado
       */
      //this.clients[socket.id] = { socket: socket};

      this.server.emit(
        'welcome-messege',
        'Bienvenidos a nuestro servidor, usuario ${socket.id}',
      );

      //Mandamos la informacion del usuario al servicio
      this.socketService.onConnection(socket, payload);

      socket.on('disconnect', () => {
        console.log('Usuario desconectado con id: ${socket.id}');
        //Si se desconecta, se elimina el usuario del servicio
        this.socketService.onDisconnect(socket);
      });
    } catch (error) {
      //En caso de error se debe desconectar
      socket.disconnect();
      //Mensaje de excepcion
      throw new UnauthorizedException('Informacion incorrecta');
    }
    });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
