<script setup lang="ts"></script>
<template>
  <div class="spinner-big" data-test="spinner">
    <div class="spinner-icon-container">
      <div class="spinner-dot margin-r-10 margin-b-10"></div>
      <div class="spinner-dot margin-b-10"></div>
      <div class="spinner-dot margin-r-10"></div>
      <div class="spinner-dot"></div>
    </div>
  </div>
</template>

<style scoped>
.spinner-big {
  min-height: 120px;
  display: flex;
  height: 100%;
}

.spinner-icon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 45px;
  height: 45px;
  margin: auto;
  animation: spinner 3.5s infinite linear;
}

.spinner-dot {
  width: 15px;
  height: 15px;
  background-color: hsla(160, 100%, 37%, 1);
  border-radius: 50%;
}

.margin-r-10 {
  margin-right: 10px;
}

.margin-b-10 {
  margin-bottom: 10px;
}

@keyframes spinner {
  0% {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotateZ(720deg) translate3d(0, 0, 0);
  }
}
</style>
