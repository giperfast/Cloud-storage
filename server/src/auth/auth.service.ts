import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { randomBytes } from 'node:crypto';
import { PrismaClient, Prisma } from '@prisma/client'


@Injectable()
export class AuthService {
  	constructor(private readonly databaseService: DatabaseService) {}

	async createSession(user): Promise<string> {
		const date = Math.floor(Date.now()/1000);
		const session_id = randomBytes(32).toString('hex');
		const session = await this.databaseService.session.create({
			data: {
				session_id: session_id,
				expiry_date: date + 2592000,
				userId: user.id
			}
		})
		return session_id;
	}

	async deleteSession(session_id): Promise<any> {
		if (!this.findSession(session_id)) {
			return true;
		}

		const session = await this.databaseService.session.delete({
			where: {
			  	session_id: session_id,
			},
		})

		return true;
	}

	async fromBaerer(request): Promise<any> {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];

		if (!token) {
			throw new UnauthorizedException();
		}

		const user = this.findSession(token);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}

	async findSession(session_id): Promise<any> {
		const session = await this.databaseService.session.findUnique({
			where: {
				session_id: session_id,
			},
			include: {
				user: true,
			},
		})

		return session?.user;
	}
}
