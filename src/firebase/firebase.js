import * as firebase from  'firebase';


const config = {
  apiKey: "AIzaSyCVbDD5xsKilYsO_iGp74PpLAVSunydaBo",
  authDomain: "algocado.firebaseapp.com",
  databaseURL: "https://algocado.firebaseio.com",
  projectId: "algocado",
  storageBucket: "algocado.appspot.com",
  messagingSenderId: "726497960895"
};

const app = firebase.initializeApp(config);

// const database = firebase.firestore();
//
//
// export {
//   database,
// };

export default app;
