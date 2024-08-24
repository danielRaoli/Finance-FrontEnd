<script lang="ts" setup>
import type Transaction from '@/interfaces/Transaction';
import { usetransactionStore } from '@/stores/TransactionsStore';
import Money from './Money.vue';
import { computed } from 'vue';

const props = defineProps<{
    transaction: Transaction
}>()

const formatedDate = computed(() => { 
    const date = new Date(props.transaction.date);
    return date.toLocaleDateString('pt-BR')
});

const emit = defineEmits(['transactionEditSelect'])

const transactionStore = usetransactionStore()

function removeTransaction(id : string) {
    transactionStore.removeTransaction(id)
}

function openEditFormMode(id : string) {
    emit('transactionEditSelect');
    transactionStore.selectEditTransaction(id);
}


</script>

<template>
    <li>
        <Money :type="transaction.type" :amount="transaction.value"/>
        <span class="description">{{ transaction.description }}</span>
        <span>{{ formatedDate }}</span>
        <div class="actions">
            <i @click="removeTransaction(transaction.id)" aria-label="clique para apagar está transação"
                class="fi fi-rs-trash" style="color: red;"></i>
            <i @click="openEditFormMode(transaction.id)" aria-label="clique para editar está transação"
                class="fi fi-tr-money-check-edit" style="color:  rgba(220, 201, 0, 0.94);"></i>
        </div>
    </li>
</template>


<style scoped>
li {
    width: 80%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid rgb(212, 212, 212);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    padding: 8px;
    align-content: center;
    box-shadow: -5px 5px 6px -4px rgba(130, 130, 130, 1);
}

li .actions {
    display: flex;
    gap: 10px;
    height: 100%;
    align-items: center;
}

li i {
    font-size: 24px;
    cursor: pointer;
}

span {
    font-size: 1.25rem;
}


</style>