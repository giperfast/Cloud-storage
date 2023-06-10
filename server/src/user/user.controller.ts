import { Controller, Get, Post, Query, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserDto, CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

	@Post('/login')
	@UsePipes(new ValidationPipe())
	async Login(@Body() body:UserDto): Promise<object> {
		const user = await this.userService.login(body);
		const session = await this.authService.createSession(user);
		return {session};
	}

	@Post('/logout')
	Logout(@Body('session') session: string): any {
		console.log('Deleting session: ', session);
		
		if (!session) {
			return false;
		}

		return this.authService.deleteSession(session);
	}

	@Post('/create')
	@UsePipes(new ValidationPipe())
	async Create(@Body() body:UserDto): Promise<any> {
		await this.userService.create(body);
		return true;
	}
}
