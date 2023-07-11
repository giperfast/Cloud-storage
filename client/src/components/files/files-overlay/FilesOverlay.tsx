'use client';
import styles from './FilesOverlay.module.css';
import { DownloadButton } from '@/components/buttons/download-button/DownloadButton';
import { Button } from '@/components/buttons/button/Button';
import { generateShortName, generateFullName } from '@/utils/common/files';
import { Icon } from '@/components/UI/icon/Icon';
import { useAppSelector } from '@/redux/hooks';
import { selectFiles } from '@/redux/slices/files';
import { IFile } from '@/types/file';

const FilesOverlay = () => {
    const files = useAppSelector(selectFiles);

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
                            <Button icon="share">Share</Button>
                            <DownloadButton>
                                <Button icon="cloud-download" theme="primary">Download</Button>
                            </DownloadButton>
                            <span className={styles.fileOverlayClose} id="file_overlay_close"><Icon name="times"/></span>
                        </div>
                    </>
                : ' '
            }
            </div>
        </div>
    );
};

function getTitle(files: Array<IFile>) {

    if (files.length === 1) {
        return (<span title={generateFullName(files[0]?.name, files[0]?.extension)}>
            { generateShortName(files[0]?.name, files[0]?.extension) }
        </span>);
    }

    return `${files.length} files`;
}

export { FilesOverlay };