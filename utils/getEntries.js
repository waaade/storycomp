import firebase from 'firebase/app'
import initFirebase from '../utils/auth/initFirebase'
import 'firebase/firestore'

const getEntries = async (uid) => {
    initFirebase();
    let db = firebase.firestore();
    const entriesRef = db.collection('entries');
    const snapshot = await entriesRef.where('userId', '==', uid).get();
    let entries = null;
    if (snapshot.empty) {
      console.log('No matching documents.');
    }
    else {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            if (!entries) {
                entries = [generateEntryObject(doc)];
                }
            else {
                entries.push(generateEntryObject(doc));
            }
        });
        
    return entries;
    }
}

//Takes a firebase document object and returns an object easier to work with
const generateEntryObject = (entry) => {
    return {
        id: entry.id,
        data: {
            name: entry.data().name,
            userId: entry.data().userId,
            projectId: entry.data().projectId
            }
        };
}

export default getEntries;