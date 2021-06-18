<template>
  <div id="app">
    <Header v-if="isActive"></Header>
    <router-view v-if="isActive"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Nav/Header.vue";
import Footer from "@/components/Footer/Footer";
export default {
  name: "app",
  // 控制局部刷新组件
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isActive: true,
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    reload() {
      this.isActive = false;
      this.$nextTick(() => {
        this.isActive = true;
      });
    },
  },
};
</script>

<style>
#app {
  min-height: 100%;
  min-width: 1200px;
  background-color: rgb(230, 230, 230);
  display: flex;
  flex-direction: column;
}
</style>
