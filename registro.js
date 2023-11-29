import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getDatabase,ref,set,child, get, push,query, orderByChild,update } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
const firebaseConfig = {      
    apiKey: "AIzaSyCken1ZOE9TagIOn57fwNoXDCBt8PdTm0k",      
    authDomain: "autotransporte-1187f.firebaseapp.com",      
    projectId: "autotransporte-1187f",      
    storageBucket: "autotransporte-1187f.appspot.com",      
    messagingSenderId: "666454949684",      
    appId: "1:666454949684:web:16f05831a3391a25b0af61"      
};  
//Datos de inicio firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
function listeners(){
    registro_1.addEventListener('click', (e) => {
        let resultado = e.target.innerHTML;
        console.log(resultado)
        var email = document.getElementById('emailreg').value
        var password = document.getElementById('passwordreg').value
        createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            alert('usuario creado')
        }).catch(error=>{
            const errorCode = error.code;
            if(errorCode == 'auth/email-already-in-use')
                alert("El correo ya esta en uso")
            else if(errorCode == 'auth/invalid-email')
                alert("El correo no es valido")
            else if(errorCode == 'auth/weak-password')
                alert('La contraseña debe tener al menos 6 caracteres')
        })
    });
}
listeners();

