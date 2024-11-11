import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'nest_project',
      password: 'root',
      autoLoadEntities: true, // Carrega entidades sem precisar especifica-las
      synchronize: true //Sincroniza com BD. Não usar em produção

    }),
    MessagesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
