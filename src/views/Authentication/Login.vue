<script lang="ts" setup>
import FormBox from '@/components/FormBox.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref,  } from 'vue'
import { useRouter } from 'vue-router';
const userName = ref('');
const password = ref('');

const authStore = useAuthStore();
const router = useRouter();

async function login(){
   await authStore.login(userName.value, password.value);

   if(authStore.isAutenticated){
    router.push('transactions')
   }
}

onMounted(() => {
    if(authStore.isAutenticated){
        router.push('transactions')
    }
})


</script>

<template>

    <FormBox>
        <h1>Enter with Yout account</h1>
            <form @submit.prevent="login">
                <div class="form-field">
                    <label for="userName">User Name</label>
                    <input placeholder="Enter with your username" type="text" id="userName" v-model="userName" required>
                    <i class="fa-solid fa-coins"></i>
                </div>
                <div class="form-field">
                    <label for="password">Password</label>
                    <input placeholder="Password" type="password" id="password" v-model="password" required>
                </div>
                <button class="main-button" type="submit">Login</button>
            </form>
            <RouterLink :to="'/register'">You don't have account ? Register</RouterLink>
    </FormBox>


</template>


<style scoped>

</style>