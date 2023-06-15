'use client'
import { memo } from 'react';
import styles from './FilesOverlay.module.css';
import { FilesFunctionsContext } from '@/utils/context/files.context';
import { IFileData, IFileProps } from '@/components/file/File';
import { DownloadButton } from "@/components/buttons/download-button/DownloadButton";
import { Button } from "@/components/buttons/button/Button";
import { downloadFiles } from '@/utils/api/files/download';
import { generateShortName, generateFullName } from '@/utils/files/files';
import { Icon } from '@/components/icon/Icon';

const FilesOverlay = memo(({files, isActive}: any) => {
    const activeClass = files.length !== 0 ? styles.active : '';
    return (
        <div className={styles.overlay + ' ' + activeClass} id="file_overlay">
            <div className={styles.container}>
            {
                files.length !== 0 ?
                    <>
                        <div className={styles.title}>
                            {getTitle(files)}
                        </div>

                        <div className={styles.buttons}>
                            <Button title="Share" icon="share"/>
                            <DownloadButton title="Download" icon="cloud-download" files={files}/>
                            <span className={styles.fileOverlayClose} id="file_overlay_close"><Icon name="times"/></span>
                        </div>
                    </>
                : ' '
            }
            </div>
        </div>
    )
})

function getTitle(files) {

    if (files.length === 1) {
        return (<span title={generateFullName(files[0]?.name, files[0]?.extension)}>
            { generateShortName(files[0]?.name, files[0]?.extension) }
        </span>);
    }

    return `${files.length} файлов`;
}

export { FilesOverlay };