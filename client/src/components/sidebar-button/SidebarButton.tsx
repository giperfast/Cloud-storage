import Link from 'next/link';
import styles from './SidebarButton.module.css';
import { Icon } from '@/components/icon/Icon';


function SidebarButton({active, title, icon}) {

    const activeClass = active === 'true' ? styles.active : ''

    return (
        <Link href="/" className={styles.button + ' ' + activeClass}>
            <span className={styles.icon}><Icon name={icon}/></span>
            {title}
        </Link>
    )
}

export { SidebarButton };