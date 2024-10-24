<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>
<script lang="js" setup>
import request from '@/utils/request'

request(
  {
    method: 'GET',
    url: '/front/ad/getAdList'
  }).then(res => {
  console.log(res)
})
</script>
<style lang="scss">
</style>
