

<template>
    <div class="content">
        <div class="box">
        <slot/>
        </div>
    </div>
</template>

<style scoped>
.box {
    -webkit-box-shadow: 1px 3px 6px 0px rgba(130, 130, 130, 1);
    -moz-box-shadow: 1px 3px 6px 0px rgba(130, 130, 130, 1);
    box-shadow: 1px 3px 6px 0px rgba(130, 130, 130, 1);
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

@media screen and (max-width:500px) {
    .box{
        width: 90%;
    }
}

</style>