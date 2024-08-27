<script lang="ts" setup>
import { useAuthStore } from '@/stores/AuthStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Iconlogo from './icons/iconlogo.vue';


const authStore = useAuthStore();


const isAutenticate = computed(() => authStore.token)

function logout(){
  authStore.logout();
}

</script>

<template>
    <header>
        <nav>
            <div class="logo">
              <span>Finance</span>
              <Iconlogo/>
            </div>
            <div v-if="isAutenticate" class="menu">
                <RouterLink :to="'/dashboard'" class="nav-link">DashBoard</RouterLink>
                <RouterLink class="nav-link" :to="'/transactions'">Transactions</RouterLink>
                <a @click="logout" href="">Logout</a>
            </div>
            <div v-else class="menu">
                <RouterLink :to="'/register'" class="nav-link">Register</RouterLink>
                <RouterLink class="nav-link" :to="'/login'">Login</RouterLink>
            </div>
        </nav>
    </header>
</template>

<style scoped>
header {
  height: 70px;
  width: 100%;
  background-color: #fefefe;
  text-align: center;

  box-shadow: 1px 3px 6px 0px rgba(130, 130, 130, 1);

}

nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px 0 18px;

}

.menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: black;
  font-size: 1rem;
  text-decoration: none;

}

.logo {
  color: black;
  font-size: 36px;
  display: flex;
  align-items: self-end;
}
</style>