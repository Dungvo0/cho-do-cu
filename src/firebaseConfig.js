import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import  "firebase/functions"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBETzFA3Ghr6_F06os_v_IusKis5K5TbgI",
  authDomain: "chodocu-5df77.firebaseapp.com",
  projectId: "chodocu-5df77",
  storageBucket: "chodocu-5df77.firebasestorage.app",
  messagingSenderId: "776888992323",
  appId: "1:776888992323:web:a8e561eb9058e2c1230af6"
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth, Firestore và Storage
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app); // Khởi tạo Firebase Storage

// Xuất các đối tượng cần thiết
export { auth, googleProvider, db, storage };
