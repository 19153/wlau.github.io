<script setup lang="ts">
import Home from '@/views/Home/Index.vue';
</script>

<template>
  <div class="bg"> </div>
  <!-- <div class="parent relative w-100 h-100 bg-dark-50">
    <div class="relative">
      <div class="bbb absolute w-50 h-50 bg-indigo-50 -z-1 left-90"></div>
    </div>
  </div> -->
  <Home></Home>
</template>

<style lang="less">
@import url('./styles/app.less');

.bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: -10;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, silver, rgb(191, 191, 224) 80%);
  // background: url(./assets/bg.webp) no-repeat;
  background-size: cover;
  // filter: blur(10px);
  // transform: scale(1.1);
}
</style>
