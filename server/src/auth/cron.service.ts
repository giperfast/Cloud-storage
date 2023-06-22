import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthService } from './auth.service';

@Injectable()
export class CronService {
    constructor(private readonly authService: AuthService) {}

    @Cron('* 10 * * * *')
    async clearSessions() {
        console.log('start cron');
        
        const sessions = await this.authService.getSessions();

        for (const session of sessions) {
            if (session['expiry_date'] <= Math.floor(Date.now()/1000)) {
                await this.authService.deleteSession(session['session_id']);
            }
        }

        console.log('end cron');
    }
}