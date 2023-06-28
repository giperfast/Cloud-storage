import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { createHmac } from 'node:crypto';
import { CreateUserDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(private readonly databaseService: DatabaseService) {}

	async create(dto: CreateUserDto): Promise<boolean> {
		const date = Math.floor(Date.now()/1000);
		const password_hash = this.SHA256(this.SHA256(dto.password, 0), date);

		const user = await this.databaseService.user.findUnique({
			where: {
				username: dto.username,
			},
			include: {
				profile: true,
				sessions: true,
			},
		})

		if (user) {
			throw new HttpException('User already registered', HttpStatus.FORBIDDEN);
		}
		

    	await this.databaseService.user.create({
			data: {
				username: dto.username,
				password: password_hash,
				profile: {
					create: {
						password_date: date
					}
				}
			}
		});

		return true;
  	}

	async login(dto: UserDto): Promise<any> {
		const user = await this.databaseService.user.findUnique({
			where: {
				username: dto.username,
			},
			include: {
				profile: true,
				sessions: true,
			},
		})

		if (!user) {
			throw new HttpException('User not found', HttpStatus.FORBIDDEN);
		}
		
		const password_hash = this.SHA256(this.SHA256(dto.password, 0), user.profile.password_date);
		
		if (user.password !== password_hash) {
			throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
		}

		return user
	}

  	SHA256(string: string, secret: string|number): string {
    	return createHmac('sha256', String(secret)).update(string).digest('hex');
  	};
}
