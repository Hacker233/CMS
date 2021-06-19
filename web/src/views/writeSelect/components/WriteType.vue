<template>
    <div class="write-card" @click="toWriteEditor"></div>
</template>
<script>
export default {
    methods: {
        toWriteEditor(){
            this.$router.push({name:'writeArticle'})
        }
    }
}
</script>
<style lang="less" scoped>
.write-card {
    width: 280px;
    height: 300px;
    background-color: #fff;
    margin-bottom: 20px;
}
</style>