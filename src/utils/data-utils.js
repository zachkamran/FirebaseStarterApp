import firebase from '../firebase/firebase'
import {auth} from "../firebase";
import {Collections as Constants} from "../constants/Collections";

/**
 * Return true if the logged in user has connected their stripe account
 */
export async function isStripeConnected(uid) {
  const businessStripe = await firebase.firestore().collection(Constants.STRIPE_BUSINESS).doc(uid).get();

  console.log(businessStripe, businessStripe.data())
  if (!businessStripe.exists) {
    return false;
  }
  return businessStripe.data().stripe_user_id !== undefined;
}


export async function getBusinessProfile() {
  const user = await auth.getAuth().currentUser;
  return await firebase.firestore().collection(Constants.PLACES).doc(user.uid).get();
}



