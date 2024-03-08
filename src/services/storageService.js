import { v4 as uuidv4 } from "uuid";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadFile = (picture, folderName) => {
    return new Promise ((resolve, reject) => {
        if(!picture){
            resolve("https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg")
        }
        const splitName = picture.name.split(".");
        const extension = splitName[splitName.length - 1];
        const completeRoute = `${folderName}/${uuidv4()}.${extension}`;
        //ref me permite saber donde y con que nombre o ruta
        const storageRef = ref(storage, `${completeRoute}`);

        uploadBytes(storageRef, picture)
        .then(() => {
            return getDownloadURL(storageRef)
        })
        .then((url) => {
            resolve(url)
        })
        .catch((error) => {
            reject(error)
        })
    })
    
}

export {
    uploadFile
}
