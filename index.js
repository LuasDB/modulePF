import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"; 
import { getAuth,signOut,onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getStorage,ref,uploadBytes,getDownloadURL,uploadBytesResumable ,getMetadata,updateMetadata} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
import { collectionGroup, collection, addDoc,getFirestore,query,where,getDocs,doc,setDoc,getDoc} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyC2eIzzCPoMJS6-nzTayxeaCq4Sm8fqVJM",
  authDomain: "sirdb-1d3ba.firebaseapp.com",
  projectId: "sirdb-1d3ba",
  storageBucket: "sirdb-1d3ba.appspot.com",
  messagingSenderId: "844126039442",
  appId: "1:844126039442:web:781bb173550e1560d1654b"
};

//Datos de inicio firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Datos del usuario
const name = "Marco Romaniz2";
const email = document.getElementById('emaillog');
const password = document.getElementById('passwordlog');
let idUser = null;

//Variables para elementos de DOM
const login = document.getElementById('login');
const logindiv = document.getElementById('logindiv');
const page = document.getElementById('page');

const btn_buscar=document.getElementById('btn_buscar');
const a = document.getElementById('a');
const tabla = document.getElementById('data_content');
const busqueda = document.getElementById('busqueda');
const btn_salir = document.getElementById('btn_salir');
//saul.delafuenteb@gmail.com
//quesadilla16

//FUNCIONES
async function consulta(){
 
  console.log('CONSULTA');
  tabla.innerHTML='';
  const ref2 = collection(db,"informesPF"+a.value);
  const q = query(ref2,where("clienteId","==","h7MZ6wSR2BVJVxNa9qF9"))
  const res = await getDocs(q);
  console.log('[INICIO LA CONSULTA]',res);

  res.forEach(element => {
      let fila = document.createElement('tr');
      fila.classList.add('renglon');
      fila.innerHTML=`
      <td class="hiden">${element.data().licencia} ${element.data().isotopo} ${element.data().num_serie}</td>
      <td>${element.data().licencia}</td>
      <td>${element.data().isotopo}</td>
      <td>${element.data().num_serie}</td>
      <td>${element.data().actividad}</td>
      <td>${element.data().fecha_frotis}</td>
      <td>${element.data().fecha_informe}</td>
      `;
      let btnD = document.createElement('td');
      btnD.onclick = ()=> descargar(element.data().nombre_pdf);
      btnD.innerHTML=`<span class="material-symbols-outlined" id="btnDown:${element.data().nombre_pdf}">download</span>`;
      // <td><span class="material-symbols-outlined" id="btnDown:${element.data().nombre_pdf}" onclick="myFunction()">download</span></td>
      fila.appendChild(btnD);
      tabla.appendChild(fila);
  });
  console.log('[FINALIZO LA CONSULTA]');
}
function filtro(){
  let renglones = document.querySelectorAll('.renglon');
  let newArray =[]
  
  renglones.forEach(row=>{               
      newArray.push(row.children[0].innerHTML);
      
  });
  let nuevo = newArray.filter((r) => {
      return r.toLowerCase().includes(busqueda.value.toLowerCase());           
  });
  let index =0;
  console.log('[FILTRADOS]:',nuevo);
  renglones.forEach(row=>{
      if(row.children[0].innerHTML.toLowerCase().includes(busqueda.value.toLowerCase())){
          
          row.classList.remove('hiden');
      }else{
          row.classList.add('hiden');
      }
      index++;
  });
  
}
function descargar(nombre){
  console.log('[DESCARGANDO...]:',nombre);
  getDownloadURL(ref(storage,'2023/'+nombre)).then((url)=>{
      console.log(url);
       window.open(url);
  }).catch(e=>{console.log(e)});

}

function listeners(){

  login.addEventListener('click', (e) =>{
    let resultado = e.target.innerHTML;
    console.log(resultado);
    switch (resultado){
      case 'Ingresar':
        const email = document.getElementById('emaillog').value;
        const password = document.getElementById('passwordlog').value;
        console.log(email);
        signInWithEmailAndPassword(auth, email.trim(), password.trim())
          .then((userCredential) => {
           // Signed in
          const user = userCredential.user;
          console.log('Autenticado: ' + user.uid);
          // window.location.href = "consultas.html";
          idUser = user.uid;    
          logindiv.classList.add('hidden');
          page.classList.remove('hidden');
          setInterval(() => {
             return;
          }, 1500);
               
          consulta();

          })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let error_message = document.getElementById('error_message');
        error_message.classList.remove('hidden');
        
        //window.location.href = "index.html";
        });
      break;
    }
  });

  busqueda.addEventListener('keyup',filtro);

  a.addEventListener('keyup',consulta);

  btn_salir.addEventListener('click',async()=>{
    signOut(auth).then(() => {
      console.log('Se cerro la sesion ');
      logindiv.classList.remove('hidden');
      page.classList.add('hidden');
      email.value='';
      password.value='';
      
  
  }).catch((error) => {
    console.log('Un error en el cierre de sesion:' + error);
  });
  });

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  
  //     const uid = user.uid;
      
  //     idUser = uid;
  //     console.log(uid);
  //     console.log('Estamos adentro con :' + idUser);
  //     logindiv.classList.add('hidden');
  //           page.classList.remove('hidden');
  //           consulta();
  //   }
  //   else {
  //     document.querySelector('body').style.backgroundColor = 'var(--white)';
  //   }
  // });
  



}
listeners();





function writeUserData(userId, name, lastName, whatsapp, email) {
  
  if (set(ref(db, 'users/' + userId), {
    userName: name,
    userLastName: lastName,
    email: email,
    whatsapp: whatsapp,
    customers: 'null',
    cycles: 'null',
    
    
  })) { 
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu cuenta ha sido creada!',
    showConfirmButton: false,
    timer: 2500
  });
  
  }
}
