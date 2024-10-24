<template>
    <div class="home">首页123{{ $store.state.count }}
      <el-button @click="addN" type="success" circle> + </el-button>
    </div>
</template>
<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      count: 10
    }
  },
  methods: {
    async addN () {
      this.$store.commit({
        type: 'addCount',
        count: this.count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button.is-circle {
  font-size: 32px;
}
</style>
