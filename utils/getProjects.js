import firebase from 'firebase/app'
import initFirebase from '../utils/auth/initFirebase'
import 'firebase/firestore'

const getProjects = async (uid) => {
    initFirebase();
    let db = firebase.firestore();
    const projectsRef = db.collection('projects');
    const snapshot = await projectsRef.where('userId', '==', uid).get();
    let projects = null;
    if (snapshot.empty) {
      console.log('No matching documents.');
    }
    else {
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        if (!projects) {
            projects = [{id: doc.id, 
                        data: {
                        name: doc.data().name, 
                        userId: doc.data().userId}
                        }];
        }
        else {
            projects.push({id: doc.id, 
                      data: {
                        name: doc.data().name, 
                        userId: doc.data().userId}
                        });
        }
                });
        
        
    return projects;
    }
}

export default getProjects;