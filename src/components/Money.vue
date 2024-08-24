<script lang="ts" setup>
import { ITransactionType } from '@/interfaces/ITransactionType';
import { ref, computed, defineProps, onMounted, watch } from 'vue';


const props = defineProps<{
  amount: number,
  type?: ITransactionType
}>()

const isWithDraw = ref<boolean | null>(null);

watch(() => props.type, (newTypeValue) => {
  isWithDraw.value = props.type === ITransactionType.WithDraw
})

onMounted(() => {
  if (props.type === undefined) {
    isWithDraw === null
  }
  else {
    isWithDraw.value = props.type === ITransactionType.WithDraw
  }
})


const computedClass = computed(() => isWithDraw.value ? 'money-red' : 'money-green')

const computedAmount = computed(() => {
   return isWithDraw.value ? props.amount * -1 : props.amount
})

const coinValue = computed(() => {
  return computedAmount.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });



});

</script>

<template>
  <span class="money" :class="computedClass">{{ coinValue }} </span>
</template>

<style>
.money {
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.money.money-green {
  color: rgb(111, 222, 0);
}

.money.money-red {
  color: rgb(235, 0, 0);
}
</style>