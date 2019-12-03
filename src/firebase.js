import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
    apiKey: 
    authDomain: 
    databaseURL: 
    projectId: 
    storageBucket: 
    messagingSenderId: 
    appId: 
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

    async register(name, email, password) {
        const cred = await this.auth.createUserWithEmailAndPassword(email, password)

        return cred
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    addComment(collectionName, posterID, content) {
        return this.db.collection(collectionName).add({
            posterID: posterID,
            content: content,
            timestamp: new Date().toISOString()
        })
    }

    addTweet(userID, post, oldPosts) {
        this.db.collection('users').doc(userID).update({
            tweets: [post, ...oldPosts]
        })
    }

    addPhoto(userID, post, oldPosts) {
        this.db.collection('users').doc(userID).update({
            gallery: [post, ...oldPosts]
        })
    }

    getData(collectionName) {
        return this.db.collection(collectionName)
    }

    async updateProfile(email, password) {
        const user = this.auth.currentUser

        try {
           user && await user.updateEmail(email)
        } catch { console.log('email didnt update')}

        try {
            user && await user.updatePassword(password)
        } catch {console.log('password didnt update')}
    }

    updateDisplayInfo(userID, name, avatar, bio) {
        return this.db.collection('users').doc(userID).update({
            name: name,
            avatar: avatar,
            bio: bio
        })
    }
}

export default new Firebase()
