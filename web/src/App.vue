<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Nav/Header.vue";
import Footer from "@/components/Footer/Footer";
export default {
  name: "app",
  components: {
    Header,
    Footer
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
