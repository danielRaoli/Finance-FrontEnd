<script setup lang="ts">
import Money from '@/components/Money.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { usetransactionStore } from '@/stores/TransactionsStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const transactionStore = usetransactionStore();

const authStore = useAuthStore();
const router = useRouter();

onMounted(()=> {
    if(!authStore.isAutenticated){
        router.push('login')
    }
})

</script>

<template>
    <div class="content">
        <div class="wrapper-grid">
            <div class="box">
            <span class="box-title">Total Balance</span>
            <Money :amount="transactionStore.totalBalance" />
        </div>
        <div class="box">
            <span class="box-title">Transaction Received</span>
            <span class="box-value">{{ transactionStore.totalTransactions }}</span>
        </div>
        <div class="box ">
            <span class="box-title">WithDraws</span>
            <Money :amount="transactionStore.totalBalanceWithDraw" />
        </div>
        </div>
        <div class="wrapper-box">
            <div class="box">
                <span class="box-title">Inflows</span>
                <Money :amount="transactionStore.totalBalanceInflow" />
            </div>
            <div class="box">
                <span class="box-title">Recent Transaction</span>
                <div class="recent-transactions">
                    <span>alugel</span>
                    <span>R$ 7.000,00</span>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.content {
    padding: 2rem;
}

.wrapper-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    justify-items: center;
    align-content: baseline;
    gap: 1rem;
}

.wrapper-box {
    width: 100%;
    display: flex;
    grid-column: span 3;
    gap: 1rem;
}


.box {
    -webkit-box-shadow: -1px 10px 34px -19px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 10px 34px -19px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 10px 34px -19px rgba(0, 0, 0, 0.75);
    padding: 1rem;
    height: 100px;
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

}

.wrapper-box > .box{
    height: 150px;
}

.box-title {
    font-size: 1rem;
    font-weight: bold;
}

.money, .box-value {
    color: black;
    font-size: 1.5rem;
}

.recent-transactions{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>