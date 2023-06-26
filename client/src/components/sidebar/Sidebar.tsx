'use server'
import React from 'react';
import styles from './Sidebar.module.css';
import { convertBytes } from '@/utils/common/bytes';
import { Button } from "@/components/buttons/button/Button";
import { UploadButton } from "@/components/buttons/upload-button/UploadButton";
import { IUser } from '@/types/user';
//import { useRouter } from 'next/router'
import { headers } from 'next/headers';

const buttons = [
    { 
        title: 'All files',
        icon: 'file',
        href: '/cloud',
    },
    { 
        title: 'Recent',
        icon: 'file-alt',
        href: '',
    },
    { 
        title: 'Photo',
        icon: 'file-image',
        href: '',
    },
    { 
        title: 'Recycle',
        icon: 'trash-alt',
        href: '/cloud/recycle',
    },
]

function Sidebar({user}: {user: IUser}) {
    const headersList = headers();
    const path = headersList.get('x-url');
    
    const can_upload = user.storage.used <= user.storage.total;
    const usage_percent = (100 * user.storage.used) / user.storage.total;

    return (
        <div className="page-sidebar">
			<div className="page-container">
				<div className={styles.wrapper}>

				<UploadButton isActive={can_upload}>
					<Button icon="upload" theme="primary">Upload</Button>
				</UploadButton>

                {
                    buttons.map((button, index) => {
                        return (
                        <Button href={button.href} icon={button.icon} theme={path === button.href ? 'gray' : 'transparent'} key={index}>
                            {button.title}
                        </Button>
                        )
                    })
                }

				<div className={styles.capacity}>
					<label htmlFor="file">
						{convertBytes(user.storage.total - user.storage.used, 'GB')} GB of {convertBytes(user.storage.total, 'GB')} GB free
					</label>
					<progress id="file" max="100" value={usage_percent}/>
				</div>
				</div>
			</div>
		</div>
    );
}

export { Sidebar };