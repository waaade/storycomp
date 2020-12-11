import firebase from 'firebase/app'
import initFirebase from '../utils/auth/initFirebase'
import 'firebase/firestore'

const getEntries = async (uid) => {
    initFirebase();
    let db = firebase.firestore();
    const entriesRef = db.collection('entries');
    const snapshot = await entriesRef.where('userId', '==', uid).get();
    // let entries = null;
    if (snapshot.empty) {
      console.log('No matching documents.');
    }
    else {
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        })
        // if (!entries) {
        //     projects = [{id: doc.id, 
        //                 data: {
        //                 name: doc.data().name, 
        //                 userId: doc.data().userId}
        //                 }];
        // }
        // else {
        //     projects.push({id: doc.id, 
        //               data: {
        //                 name: doc.data().name, 
        //                 userId: doc.data().userId}
        //                 });
        // }
        //         });
        
        
    return snapshot;
    }
}

export default getEntries;