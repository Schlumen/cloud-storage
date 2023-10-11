import React from 'react';
import Navbar from './Navbar';
import Folder from './Folder';
import AddFolderButton from './AddFolderButton';
import { Container } from 'react-bootstrap';
import { useFolder } from '../../hooks/useFolder';

export default function Dashboard() {
    const { folder, childFolders } = useFolder("NDJX617gS4BQERafbZ7g");
    console.log(childFolders)
    return <>
        <Navbar />
        <Container fluid>
            <AddFolderButton currentFolder={folder} />
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
        </Container>
    </>
}
