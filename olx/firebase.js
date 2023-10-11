import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

import { getFirestore, setDoc, doc, addDoc, collection,getDocs  } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyAcijVTr5zuUIxUMD18C1h9kNYkJ1xZcME",
    authDomain: "sir-firebase-337de.firebaseapp.com",
    projectId: "sir-firebase-337de",
    storageBucket: "sir-firebase-337de.appspot.com",
    messagingSenderId: "634874761396",
    appId: "1:634874761396:web:6970f568d1ebe2c44e87e1",
    measurementId: "G-VG3CXE4FFK"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const db = getFirestore(app);
const storage = getStorage(app);


async function SignupFirebase(userInfo) {
    const { email, password } = userInfo
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    await addUserToDB(userInfo, userCredential.user.uid)

}

function addUserToDB(userInfo, id) {
    const { email, userName, age } = userInfo
    return setDoc(doc(db, "users", id), { email, userName, age })
}


function signinFirebase(loginEmail, loginPassword) {
    return signInWithEmailAndPassword(auth, loginEmail, loginPassword)

}




function postAdToDB(title, price,imageUrl ) {
    const userId = auth.currentUser.uid
    return addDoc(collection(db, "Addss"), {
        title: title,
        price: price,
        userId: userId,
        imageUrl:imageUrl,        
    });

}


async function uploadimage(image){


    const imagesRef = ref(storage, 'images/{image.name}');
    const snapshot = await uploadBytes(imagesRef, image)
    const url =  getDownloadURL(snapshot.ref)
    return url}
  







// async function uploadImage(image) { const imagesRef = ref(storage, 'images/{image.name}');
// const snapshot = await uploadBytes(imagesRef, image)
// const url = getDownloadURL(snapshot.ref)
// return url
// }








async function getAdsFromDB() {
    // const docRef = doc(db, "cities", "SF");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    // }

    // Sir ka convert
    const querySnapshot = await getDocs(collection(db, "Addss"));
    const ads = []
    querySnapshot.forEach((doc) => {
        ads.push({id : doc.id, ...doc.data()})
        
    });
    console.log(ads)
    return ads;
}


export {
    SignupFirebase,
    signinFirebase,
    postAdToDB,
    uploadimage,
    getAdsFromDB,}