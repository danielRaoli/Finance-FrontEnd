<script lang="ts" setup>
import { ref, watch } from 'vue'
import transactionstypes from '@/hooks/GetTransactionTypes';
import { usetransactionStore } from '@/stores/TransactionsStore';
import { debounce } from 'lodash';

const activity = ref(false)

const minTransactionValue = ref<null | number>();
const type = ref<null | number>();

const transactionStore = usetransactionStore();

const filteredGreaterThan = debounce(async () => {
    if (minTransactionValue.value !== null) {
        await transactionStore.getTransactionGreaterThan(minTransactionValue.value!);
    }
}, 1000);

const filteredByType = async () => {
    if (type.value) {
        await transactionStore.getTransactionsByType(type.value);
    } else {
        await transactionStore.getTransactions();
    }
}


watch(() => minTransactionValue.value, async (newValue) => {
    if (type.value) {
        transactionStore.filterTransactions(type.value!, newValue!)
    } else {
        await filteredGreaterThan();
    }
});

watch(() => type.value, async (newValue) => {
    if (minTransactionValue.value) {
        transactionStore.filterTransactions(newValue!, minTransactionValue.value)
    } else {
        await filteredByType();
    }
});

const togleFilter = () => {
    activity.value = !activity.value
}

</script>

<template>
    <div @click="togleFilter" class="active-filter">
        <span>
            Filters
        </span>
        <i class="fi" :class="activity ? 'fi-rr-angle-up' : 'fi-rr-angle-down'"></i>
    </div>
    <div class="filters" :class="{ 'is-activity': activity }">
        <div>
            <label for="minvalue">Min Value</label>
            <input id="minvalue" type="number" v-model="minTransactionValue" placeholder="min value">
        </div>
        <div>
            <label for="type">Transaction Type</label>
            <select id="type" v-model="type">
                <option :value="null">All</option>
                <option v-for="type in transactionstypes" :key="type.value" :value="type.value">{{ type.label }}
                </option>
            </select>
        </div>

    </div>
</template>

<style>
.filters {
    width: 100%;
    display: none;
    gap: 1rem;
    justify-content: space-evenly;
    padding: 0 5rem;
}

.filters.is-activity {
    display: flex;
}

.active-filter {
    display: flex;
    align-items: center;
    cursor: pointer;
}
</style>