<script lang="ts" setup>
import FormBox from '@/components/FormBox.vue';
import Spin from '@/components/Spin.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router';


const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const username = ref('');
const showRequirements = ref(false);

const hasUppercase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 5);

watch(password, () => {
    showRequirements.value = true;
});

const authStore = useAuthStore();
const router = useRouter();

async function register() {
    await authStore.register(email.value, username.value, password.value, confirmPassword.value)
}

onMounted(() => {
    if (authStore.isAutenticated) {
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
                <input placeholder="Password" type="password" id="password" @blur="showRequirements = false"
                    @focus="showRequirements = true" v-model="password" required>
                <div v-if="showRequirements" class="password-requirements">
                    <p :class="{ 'valid': hasUppercase }" class="requirement">
                        ✔ Pelo menos uma letra maiúscula
                    </p>
                    <p :class="{ 'valid': hasNumber }" class="requirement">
                        ✔ Pelo menos um número
                    </p>
                    <p :class="{ 'valid': hasSpecialChar }" class="requirement">
                        ✔ Pelo menos um símbolo especial
                    </p>
                    <p :class="{ 'valid': hasMinLength }" class="requirement">
                        ✔ Pelo menos 5 letras
                    </p>
                </div>
            </div>
            <div class="form-field">
                <label for="confirmPassword">Confirm Password</label>
                <input placeholder="Confirm Password" type="password" id="confirmPassword" v-model="confirmPassword"
                    required>
            </div>
            <button class="main-button" type="submit">Register</button>
            <Spin :active="authStore.loading" />
        </form>
    </FormBox>

</template>


<style>
.password-container {
    position: relative;
    display: inline-block;
}

.password-requirements {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 250px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.requirement {
    color: red;
    margin: 0;
    font-size: 14px;
}

.requirement.valid {
    color: green;
}
</style>