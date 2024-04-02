import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        const saltOrRounds = 10;
        const password = createUserDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        createUserDto.password = hash;
        this.usersService.create(createUserDto);
    }

    async getProfile(email: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(email);
        return user;
    }
}
