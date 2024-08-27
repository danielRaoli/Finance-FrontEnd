import http from "@/http"; 
import router from "@/router";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        isAutenticated: false
    }),
    actions: {
        async login(userName: string, password: string) {
            try {
                const response = await http.post('/login', {
                    userName: userName,
                    password: password
                });


                if(response.data.code >= 200 && response.data.code < 300){
                    this.token = response.data.data;
                    this.isAutenticated = true;
                    localStorage.setItem('token', this.token!);
                    http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                }
                else{
                    toast.error(response.data.errors[0])
                }

                

                
            } catch (error) {
                toast.error('error in login, try again later')
            }
        },
        async register(email: string, userName: string, password: string, confirmPassword: string) {
            try {
               const response = await http.post('/register', {
                    email: email,
                    userName: userName,
                    password: password,
                    confirmPassword: confirmPassword
                });

                if(response.data.code >= 200 && response.data.code < 300){
                    toast.success(response.data.message)
                }else{
                    toast.error("register fail try again")
                }

            } catch (error) {
                toast.error("register fail try again")
            }
        },
        loadToken() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                this.isAutenticated = true;
            }
        },
         logout() {
            this.token = null;
            localStorage.removeItem('token');
            delete http.defaults.headers.common['Authorization'];

            this.isAutenticated = false;

            router.push('login')
        },
    }
});