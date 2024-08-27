<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    active: boolean
}>()

</script>

<template>
    <div class="spin" :class="{'is-active' : active}">

    </div>
</template>

<style>

.spin{
    height: 50px;
    width: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top: 5px solid #000000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    display: none;
}

.spin.is-active{
    display: block;
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>