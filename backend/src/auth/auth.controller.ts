import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Response,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SigninUserDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Public()
    @Post('signup')
    signUp(@Body() signUpDto: CreateUserDto) {
        this.authService.signUp(signUpDto);
    }

    @Get('profile')
    async getProfile(@Request() req) {
        // TODO: refactor to use Dto
        const data = await this.authService.getProfile(req.user.email);
        return {
            name: data.name,
            email: data.email,
        };
    }
}
