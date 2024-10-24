<template>
    <div class="course">课程数量：{{ $store.state.count }}
      <el-button type="primary" @click="addCount">+</el-button>
      <vue-office-docx :src="url" />
    </div>
</template>

<script>
export default {
  name: 'CourseIndex',
  data () {
    return {
      url: 'https://github.com/reddaylight/edu-boss-fed/blob/master/public/asd.docx'
    }
  },
  methods: {
    async addCount () {
      try {
        this.$store.dispatch('asyncAddCount', {
          count: 1,
          delay: 2000
        })
        this.$store.dispatch('asyncAddCount', {
          count: 2,
          delay: 1000
        })
        this.$store.dispatch('asyncAddCount', {
          count: 3,
          delay: 500
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
