/*import { Prisma } from '@prisma/client'
import { DatabaseService } from './database.service';
import { AvatarService } from '../avatar/avatar.service';

const databaseService: DatabaseService = new DatabaseService();
const avatarService: AvatarService = new AvatarService(databaseService);

export const DatabaseExtended = Prisma.defineExtension((client) => {
	return client.$extends({
		result: {
			profile: {
				avatar: {
					needs: {},
					compute(profile): string {
						return avatarService.get(profile['userId'], profile['avatar'])
					},
				},
			},
		},
	})
})*/