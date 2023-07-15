
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ValidatorsService {
  	constructor() {}

    async folderName(value: string): Promise<any> {
        let error;
    
        const check = () => {
            if (value.length === 0) {
                error = 'value_empty';
                return false;
            }

            return true;
        }

        const  getError = () => {
            switch (error) {
                case 'value_empty':
                    return 'Value is empty'      
                default:
                    break;
            }
        }

        return {check, getError}

        
		//return true;
	}




/*export function CreateFolderValidator(value: string) {

    let error;
    
    const check = () => {
        console.log(value);
        
        if (value.length === 0) {
            error = 'value_empty';
            return false;
        }

        return true;
    }

    const  getError = () => {
        switch (error) {
            case 'value_empty':
                return 'Value is empty'      
            default:
                break;
        }
    }

    return {check, getError}*/
}