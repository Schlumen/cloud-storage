import React from "react";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { storage, database } from "../../firebase";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthContext";

export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuth();
    console.log(currentFolder);

    function handleUpload(e) {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return;

        const filePath =
            currentFolder === ROOT_FOLDER
                ? `${currentFolder.path.map(folder => folder.name).join("/")}/${file.name}`
                : `${currentFolder.path.map(folder => folder.name).join("/")}/${currentFolder.name}/${file.name}`;

        const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file);

        uploadTask.on("state_changed", snapshot => {

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files.add({
                    url: url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid
                });
            });
        });
    }
    return (
        <label className="btn btn-outline-success btn-md m-0 me-2">
            <FontAwesomeIcon icon={faFileUpload} />
            <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
        </label>
    )
}
