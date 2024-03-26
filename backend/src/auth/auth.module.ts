import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            // secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60000s' },
            secretOrKeyProvider: function () {
                return process.env.JWT_SECRET;
            },
        }),
    ],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}