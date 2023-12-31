import React from 'react';
import Navbar from './Navbar';
import Folder from './Folder';
import File from './File';
import AddFolderButton from './AddFolderButton';
import AddFileButton from './AddFileButton';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import { Container } from 'react-bootstrap';
import { useFolder } from '../../hooks/useFolder';
import { useParams, useLocation } from 'react-router-dom';

export default function Dashboard() {
    const { folderId } = useParams();
    const { state } = useLocation();
    const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder);
    return <>
        <Navbar />
        <Container fluid>
            <div className='d-flex align-items-center mt-2'>
                <FolderBreadcrumbs currentFolder={folder} />
                <AddFileButton currentFolder={folder} />
                <AddFolderButton currentFolder={folder} />
            </div>
            {childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFolders.map(childFolder => {
                        return (
                            <div key={childFolder.id} style={{ maxWidth: "250px" }} className="p-2">
                                <Folder folder={childFolder} />
                            </div>
                        );
                    })}
                </div>
            )}
            {childFolders.length > 0 && childFiles.length > 0 && <hr />}
            {childFiles.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFiles.map(childFile => {
                        return (
                            <div key={childFile.id} style={{ maxWidth: "250px" }} className="p-2">
                                <File file={childFile} />
                            </div>
                        );
                    })}
                </div>
            )}
        </Container>
    </>
}
