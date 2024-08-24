<script setup lang="ts">
import BannerIcon from '@/components/icons/banner-icon.vue';
</script>

<template>
    <div class="content">
        <div class="text">
            <p class="main-title">Track Your Finances with Finances</p>

            <p class="banner-text">Discover practical tools and tips for organizing your budget, planning investments and achieving your financial goals in a simple and effective way.</p>
        </div>

        <BannerIcon />
    </div>

</template>


<style scoped>

.content{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.text{
    width: 50%;
}

.main-title {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 5px;
}

.banner-text{
    font-size: 1rem;
    font-weight: 500;
}

svg{
    width: 40%;
}

</style>