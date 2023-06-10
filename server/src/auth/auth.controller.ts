import { Controller, Get, Post, Req, Res, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
//import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService,) {}

	@Get()
  	async auth(@Query('session') session: string): Promise<any> {
    	console.log(session, Date.now());
		//throw new HttpException('Session not found', HttpStatus.FORBIDDEN);
		const finded_session = await this.authService.findSession(session)
		
		if (finded_session === undefined) {
			throw new HttpException('Session not found', HttpStatus.FORBIDDEN);
		}
		//console.log(finded_session);
    	return finded_session;
  	}

}
