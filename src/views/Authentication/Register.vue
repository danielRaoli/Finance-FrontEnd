<script lang="ts" setup>
import FormBox from '@/components/FormBox.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';


const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const username = ref('');

const authStore = useAuthStore();
const router = useRouter();

async function  register(){
    await authStore.register(email.value, username.value,password.value, confirmPassword.value)
}

onMounted(() => {
    if(authStore.isAutenticated){
        router.push('transactions')
    }
})

</script>

<template>

    <FormBox>
        <h1>Create account</h1>
        <form @submit.prevent="register">
            <div class="form-field">
                <label for="email">Email</label>
                <input placeholder="write your best email" type="email" id="email" v-model="email" required>
                <i class="fa-solid fa-coins"></i>
            </div>
            <div class="form-field">
                <label for="username">User Name</label>
                <input placeholder="write your best email" type="text" id="username" v-model="username" required>
                <i class="fa-solid fa-coins"></i>
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input placeholder="Password" type="password" id="password" v-model="password" required>
            </div>
            <div class="form-field">
                <label for="confirmPassword">Confirm Password</label>
                <input placeholder="Confirm Password" type="password" id="confirmPassword" v-model="confirmPassword"
                    required>
            </div>
            <button class="main-button" type="submit">Register</button>
        </form>
    </FormBox>

</template>