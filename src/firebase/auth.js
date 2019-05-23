import firebase from './firebase';


export const signUp = (email, password) => {
  getAuth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
};


export const signInEmailPassword = (email, password) => {
  getAuth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};



/**
 * Returns the Firebase Auth service
 */
export const getAuth = () => {
  return firebase.auth();
};

/**
 * Returns a new instance of GitHub auth provider.
 */
export const githubOAuth = () => {
  return new firebase.firebase_.auth.GithubAuthProvider();
};

/**
 * Returns a new instance of Twitter auth provider.
 */
export const twitterOAuth = () => {
  return new firebase.firebase_.auth.TwitterAuthProvider();
};

/**
 * Returns a new instance of Facebook auth provider.
 */
export const facebookOAuth = () => {
  return new firebase.firebase_.auth.FacebookAuthProvider();
};
