<script lang="ts" setup>
import { usetransactionStore } from '@/stores/TransactionsStore';
import { ref, watch } from 'vue';
import transactionstypes from '../hooks/GetTransactionTypes'



const amount = ref<number | null>();
const description = ref('');
const typeTransaction = ref<number>()
const transactionStore = usetransactionStore();




const emit = defineEmits(['submitFinish'])

watch(() => transactionStore.transactionId,(newTransactionId) => {
    if(newTransactionId){
        const transaction = transactionStore.transactions.find(t => t.id === newTransactionId);
        amount.value = transaction!.value;
        description.value = transaction!.description;
        typeTransaction.value = transaction!.type;
    }
    else
    {
        amount.value = null;
        description.value = '';
    }
})


function submitHandle() {
    if (transactionStore.transactionId) {
        transactionStore.editTransaction(transactionStore.transactionId, description.value, amount.value!, typeTransaction.value!);
    }
    else{
        transactionStore.addTransaction(amount.value!, description.value, typeTransaction.value!);
    }

    amount.value = null;
    description.value = '';
    emit('submitFinish')
}
</script>

<template>
    <form @submit.prevent="submitHandle()">
        <div class="form-field">
            <label for="amount">Amount</label>
            <input placeholder="0000,00" type="number" id="amount" v-model="amount" required> 
            <i class="fa-solid fa-coins"></i>
        </div>
        <div class="form-field">
            <label for="description">description</label>
            <input placeholder="description for amount" type="text" id="description" v-model="description" required>
        </div>
        <div class="form-field">
            <label for="type">transaction type</label>
            <select v-model="typeTransaction" id="type" required>
                <option v-for="type in transactionstypes" :key="type.value" :value="type.value">{{ type.label }}</option>
            </select>
        </div>
        <button class="main-button" type="submit">{{ transactionStore.transactionId ? 'Edit' : 'Add' }}</button>
    </form>
</template>