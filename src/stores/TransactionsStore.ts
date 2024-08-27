import { defineStore } from 'pinia'
import type Transaction from '@/interfaces/Transaction';
import { ITransactionType } from '@/interfaces/ITransactionType';
import http from '@/http';
import { useAuthStore } from './AuthStore';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




export const usetransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[],
    transactionId: null as string | null
  }),
  getters: {
    totalBalance(state) {
      return state.transactions.reduce((totalBalance, transaction) => totalBalance + transaction.value, 0)
    },
    totalTransactions(state) {
      return state.transactions.length
    },
    totalBalanceWithDraw(state) {
      return state.transactions.reduce((totalBalance, transaction) =>
        transaction.type === ITransactionType.WithDraw ? totalBalance + transaction.value : totalBalance
        , 0)
    },
    totalBalanceInflow(state) {
      return state.transactions.reduce((totalBalance, transaction) =>
        transaction.type === ITransactionType.Deposit ? totalBalance + transaction.value : totalBalance
        , 0)
    }
  },

  actions: {
    async addTransaction(amount: number, description: string, type: number) {
      const response = await http.post('Transaction', {
        value: amount,
        description: description,
        type: type,
      });

      if(response.data.code >= 200 && response.data.code <300){
        toast.success(response.data.message)
      }


      await this.getTransactions();
    },
    selectEditTransaction(transactionid: string | null) {
      this.transactionId = transactionid;

    },
    async removeTransaction(transactionid: string) {
      
      const response = await http.delete(`Transaction/${transactionid}`)

      if (response.data.code >= 200 && response.data.code < 300) {
        await this.getTransactions();
        toast.error(response.data.message)
      }


    },
    async editTransaction(transactionid: string, description: string, amount: number, type: number) {
      const response = await http.put(`Transaction/${transactionid}`, {
        value: amount,
        description: description,
        type: type,
      });
      if (response.data.code >= 200 && response.data.code < 300) {
        await this.getTransactions();
        
        toast.info(response.data.message)
      }else{
        toast.error(response.data.error)
      }
    },
    async getTransactions() {
      const authStore = useAuthStore();
      try {
        const response = await http.get('Transaction', {
          withCredentials: true
        });

        this.transactions = response.data.data;


      }
      catch (error) {
        authStore.logout();
      }
    },
    async getTransactionGreaterThan(value : number){
      if(value){
        const response = await http.get(`Transaction/greaterthan?value=${value}`);

        this.transactions = response.data.data;
      }else{
        const response = await http.get(`Transaction/greaterthan?value=0`);

        this.transactions = response.data.data;
      }

    },
    async getTransactionsByType(type : number | null){
      if(type){
        const response = await http.get(`Transaction/type?type=${type}`);

        this.transactions = response.data.data;
      }else{
        await this.getTransactions();
      }

      

    },
    async filterTransactions(type : number | null, value : number){
      if(type){
        await this.getTransactions();
        this.transactions = this.transactions.filter(t => t.type == type && t.value >= value)
      }else{
        await this.getTransactions();
        this.transactions = this.transactions.filter(t => t.value >= value)
      }
     
    }
  }


})
