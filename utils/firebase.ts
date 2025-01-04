import { initializeApp } from 'firebase/app'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCb7KZ5ja2Hr09ixlkm3JlHeD4ZSrK5mTg",
  authDomain: "lesprit-f4bb0.firebaseapp.com",
  projectId: "lesprit-f4bb0",
  storageBucket: "lesprit-f4bb0.firebasestorage.app",
  messagingSenderId: "18573242354",
  appId: "1:18573242354:web:890fbd5c98a21ba446456b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
// Add authorization to firebase project to use auth features

export const authorization = {
  resetPassword: (options: any, email: string) => async () => {
    const [success, failure] = options.types;
    const promise = (resolve: any, reject: any) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve({
            type: success
          });
        })
        .catch(err => {
          console.log(err)
          reject({
            type: failure,
            payload: err.message
          });
        });
    }

    return new Promise(promise);
  }
}