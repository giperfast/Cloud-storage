import styles from './header.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import * as icons from '@fortawesome/fontawesome-svg-core/import.macro'
//import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
//console.log(icons);

function Icon({ic = 'check'}) {

    /*return (
        <FontAwesomeIcon icon={faCheck} className="fas fa-check" style={{ color: "red" }}></FontAwesomeIcon>
    )*/
    return (
        <div>
            <FontAwesomeIcon icon="fa-solid fa-check-square" />
            Your <FontAwesomeIcon icon="fa-regular fa-coffee" /> is hot!
        
            Compliments of the <FontAwesomeIcon icon="fa-sharp fa-solid fa-hat-chef" />!
        </div>
    )
}

export {Icon};