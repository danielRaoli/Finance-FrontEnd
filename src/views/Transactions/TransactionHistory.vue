<script lang="ts" setup>
import { usetransactionStore } from '@/stores/TransactionsStore';
import { onMounted, ref } from 'vue'
import MainForm from '@/components/MainForm.vue';
import TransactionItem from '@/components/TransactionItem.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';



const formActive = ref(false);
const transactionStore = usetransactionStore();
const authStore = useAuthStore();
const router = useRouter();
function closeForm() {
  formActive.value = false;
  transactionStore.selectEditTransaction(null)
}

onMounted(async () => {

  if (!authStore.isAutenticated) {
    router.push('login');
  }
  else {
    await transactionStore.getTransactions();
  }


})

</script>

<template>
  <div class="content">
    <h1 class="section-title">Transactions</h1>
    <button @click="formActive = true" class="main-button">
      Add new Transaction
    </button>
    <div class="modal" :class="{ 'is-active': formActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Transaction</p>
          <button @click="closeForm" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <MainForm @submit-finish="closeForm" />
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button" @click="closeForm">Cancel</button>
          </div>
        </footer>
      </div>
    </div>
    <ul>
      <TransactionItem v-for="transaction in transactionStore.transactions" @transactionEditSelect="formActive = true"
        :transaction="transaction" />
      <li class="empty" v-if="transactionStore.transactions.length === 0">
        <i class="fi fi-rr-edit"></i>
        <span>you don't have transaction History</span>
      </li>
    </ul>
  </div>

</template>

<style>
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: start;
  align-items: center;
  padding-top: 2rem;
  width: 100%;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.empty {
  font-size: 1.5rem;
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  height: 40px;
}

.form-field {
  width: 100%;
  display: flex;
  flex-direction: column;

}


input {
  height: 30px;
  border-radius: 8px;
  border: 1px solid black;
}



button {
  border-radius: 8px;
  padding: 1rem;
  font-weight: bold;
  background-color: transparent;
  color: black;
  cursor: pointer;
  margin-bottom: 10px;
}

ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;

}



.view {
  width: 100%;
  height: 100vh;
  display: flex;
}

.main-button {
  border: 1px solid black;

}
</style>