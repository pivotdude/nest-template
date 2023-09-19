import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { CorsMiddleware } from './cors.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    CorsMiddleware,
    {
      provide: 'ROLES_GUARD',
      useClass: RolesGuard,
    },
  ],
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    MailModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
