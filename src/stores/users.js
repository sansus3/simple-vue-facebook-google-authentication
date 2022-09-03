import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { auth } from "../firebase";
import { signInWithPopup, signOut, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged } from "firebase/auth";


export const useStoreUsers = defineStore(
    "users",
    () => {//Composition API (Application Process Integration)
        //Variables / Constants
        const user = ref(null);
        const error = ref(false);
        const loading = ref(false);


        //Mensajes de error con la técnica "Dynamic Property Maps"
        const errorMessages = {
            'auth/unauthorized-domain': 'El dominio actual no está autorizado para operaciones de OAuth. Esto evitará que signInWithPopup, signInWithRedirect, linkWithPopup y linkWithRedirect funcionen.',
            'auth/popup-closed-by-user': 'La ventana ha sido cerrada por el usuario.',
            'auth/internal-error':'Ha ocurrido un error de origen interno. Compruebe su conexión o contacte con el proveedor'
        }

        //Setters
        const setUser = p_user => {
            user.value = p_user;
        }
        //Getters
        const getDisplayName = computed(()=>user.value?.displayName??'');

        /**
         * Obtención del proveedor de Google
         * @url https://firebase.google.com/docs/auth/web/google-signin?hl=es&authuser=0
         */
        const onGoogleAuthProvider = () => {
            const provider = new GoogleAuthProvider();
            onAuthProvider(provider);
        }

        /**
         * Obtención del proveedr de Facebook
         * @url https://firebase.google.com/docs/auth/web/facebook-login?hl=es&authuser=0
         */
        const onFacebookAuthProvider = () => {
            const provider = new FacebookAuthProvider();
            onAuthProvider(provider);
        }
        
        /**
         * 
         * @param {Object} provider Proveedor para la Authentication de Firebase. En este caso representa el provedor de Google o Facebook obtenidas de las funciones onGoogleAuthProvider o onFacebookAuthProvider que se encuentran en esta página
         */
        const onAuthProvider = async (provider) => {            
            loading.value = true;
            try {
                const result = await signInWithPopup(auth, provider);
                //console.log(result.user)
                setUser(result.user);
            } catch (err) {
                //console.log(errorMessages[err.code]||err.message)
                error.value = errorMessages[err.code] || err.message;
            } finally {
                loading.value = false;
            }
        }

        /**
         * Desconexión de Authentication. Ver documentación en Firebase
         */
        const onSignOut = async () => {
            try {
                await signOut(auth);
               setUser(null);
            } catch (err) {
                //console.log(errorMessages[err.code]||err.message)
                error.value = errorMessages[err.code] || err.message;
            }
        }

        /**
         * Estado de la autenticación del usuario
         * Ver "Configura un observador de estado de autenticación y obtén datos del usuario" en @url https://firebase.google.com/docs/auth/web/start?hl=es&authuser=0
         */
        const isAuthState = () => {
            new Promise((resolve, reject) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        // const uid = user.uid;
                        // console.log(uid)
                        resolve(setUser(user));
                        // ...
                    } else {
                        // User is signed out
                        // ...
                        setUser(null);
                    }
                });
            });
        }
        //Retornamos las variables/constantes que deseemos
        return {
            user,
            error,
            loading,
            getDisplayName,
            onGoogleAuthProvider,
            onFacebookAuthProvider,
            onSignOut,
            isAuthState,
        }
    }
);