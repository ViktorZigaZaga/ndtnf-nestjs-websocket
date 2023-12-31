import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';


@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: `${process.env.JWT_CONSTANTS}`,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
