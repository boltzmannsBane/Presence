import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBZ3sqzd098t1xikqz-RvviWqXyY0aBkf0",
    authDomain: "iamamygdala-d2a2a.firebaseapp.com",
    databaseURL: "https://iamamygdala-d2a2a.firebaseio.com",
    projectId: "iamamygdala-d2a2a",
    storageBucket: "iamamygdala-d2a2a.appspot.com",
    messagingSenderId: "10524574812",
    appId: "1:10524574812:web:09518f067bc29f8ac29299"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    register(name, email, password) {
        this.auth.createUserWithEmailAndPassword(email, password)
        .then(cred => this.db.collection('users').doc(cred.user.uid).set({
            name: name
        }))

    }

    isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
    }

    getCurrentUser() {
        return this.auth.currentUser
    }
    
    addComment(collectionName, posterID, content) {
        return this.db.collection(collectionName).add({
            posterID: posterID,
            content: content,
            timestamp: new Date().toISOString()       
        })
    }

    addTweet(elementName, userID, post, oldPosts ) {
        this.db.collection('users').doc(userID).update({
            tweets: [post, ...oldPosts]
        }
        )
    }

    getData(collectionName) {
        return this.db.collection(collectionName)
    }

    updateProfile(userID, name, avatar) {
        return this.db.collection('users').doc(userID).update({
            name: name,
            avatar: avatar
        })
    }
}
export default new Firebase()