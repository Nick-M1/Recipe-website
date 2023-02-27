import {storage} from "../../../firebase";
import {getDownloadURL, ref} from "@firebase/storage";

export default async function DemoComponent() {


    const storageRef = ref(storage, 'testfolder/brand-logo.png')
    const fileName = await getDownloadURL(storageRef)

    // getDownloadURL(storageRef)
    // .then(res => console.log(res))
    // .catch( (err) => {
    //     switch (err.code) {
    //         case 'storage/object-not-found':
    //             // File doesn't exist
    //             break;
    //         case 'storage/unauthorized':
    //             // User doesn't have permission to access the object
    //             break;
    //         case 'storage/canceled':
    //             // User canceled the upload
    //             break;
    //         case 'storage/unknown':
    //             // Unknown error occurred, inspect the server response
    //             break;
    //     }
    // })

    return (
        <div>
            <img src={fileName} alt={'ddd'}/>
        </div>
    );
}