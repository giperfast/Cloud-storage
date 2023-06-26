import { Controller, Get, Post, Req, Res, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { FilesService } from 'src/files/files.service';
//import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly filesService: FilesService) {}

	@Get()
  	async auth(@Query('session') session: string): Promise<any> {
    	console.log(session, Date.now());

		const user = await this.authService.findSession(session)
		
		if (user === undefined) {
			throw new HttpException('Session not found', HttpStatus.FORBIDDEN);
		}
		
		const result = {
			id: user.id,
			username: user.username,
			storage: {
				used: await this.filesService.getFilesTotalSize(user.id),
				total: process.env.MAX_STORAGE,
			},
		}

    	return result;
  	}

}
