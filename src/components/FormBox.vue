

<template>
    <div class="content">
        <div class="box">
        <slot/>
        </div>
    </div>
</template>

<style scoped>
.box {
    -webkit-box-shadow: -1px 10px 34px -19px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 10px 34px -19px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 10px 34px -19px rgba(0, 0, 0, 0.75);
    padding: 1rem;
    height: auto;
    border-radius: 8px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>