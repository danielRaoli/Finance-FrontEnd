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
    align-items: center;
    height: 100%;
    padding: 2rem;
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
    width: 50%;
}

@media screen and (max-width:900px) {
    .content{
        flex-direction: column-reverse;
    }

    svg{
        width: 80%;
    }

    .text{
        width: 100%;
        text-align: center;
    }
} 

</style>