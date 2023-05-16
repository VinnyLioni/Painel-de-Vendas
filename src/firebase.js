import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyD831dl0uGdlO1IJw1NOH21t3ZyTiTlnPY",
    authDomain: "shop-list-2023-ad54b.firebaseapp.com",
    databaseURL: "https://shop-list-2023-ad54b-default-rtdb.firebaseio.com",
    projectId: "shop-list-2023-ad54b",
    storageBucket: "shop-list-2023-ad54b.appspot.com",
    messagingSenderId: "529706303778",
    appId: "1:529706303778:web:97b14d66fa27620c28e57b",
    measurementId: "G-6FB7D36LND"
}

firebase.initializeApp(firebaseConfig)

export default {
  install(Vue) {
    Vue.prototype.$firebase = firebase
  }
}