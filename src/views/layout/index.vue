<template>
    <div class="layout">
        <el-container>
            <el-aside width="200px">
                <app-aside></app-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <app-header></app-header>
                </el-header>
                <el-main>
                    <!-- 子路由出口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import AppAside from './components/AppAside.vue'
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100vh;
    min-width: 1280px;
    min-height: 720px;
}
.el-aside {
    background-color: #d3dce6;
}
.el-header {
    background-color: #d3dce6;
    padding: 0;
}
.el-main {
    background-color: #e9eef3;
}
</style>
