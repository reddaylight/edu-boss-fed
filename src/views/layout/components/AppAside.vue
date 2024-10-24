<template>
  <div class="app-aside">
    <el-menu
      default-active="1-1"
      unique-opened
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="system-title">
        <img src="@/assets/adidas-4.svg" alt="">
        <span>攒劲人力云</span>
      </div>
      <el-sub-menu index="0">
        <template #title>
          <el-icon><monitor /></el-icon>
          <span>仪表盘</span>
        </template>
        <el-menu-item index="/work">工作台</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><operation /></el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">角色列表</el-menu-item>
        <el-menu-item index="/menu">菜单列表</el-menu-item>
        <el-menu-item index="/resource">资源列表</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/course">
        <el-icon><icon-menu /></el-icon>
        <template #title>课程管理</template>
      </el-menu-item>
      <el-menu-item index="/user">
        <el-icon><user-filled /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><promotion /></el-icon>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">广告列表</el-menu-item>
        <el-menu-item index="/advert-space">广告位列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon><OfficeBuilding /></el-icon>
          <span>客户管理</span>
        </template>
        <el-menu-item index="/client_enterprise">用工企业</el-menu-item>
        <el-menu-item index="/supplier">供应商</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <el-icon><Stamp /></el-icon>
          <span>合同管理</span>
        </template>
        <el-menu-item index="/contract-template">合同模板</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script>
import {
  UserFilled,
  Operation,
  Menu as IconMenu,
  Promotion,
  Monitor,
  OfficeBuilding,
  Stamp
} from '@element-plus/icons-vue'

export default {
  name: 'AppAside',
  components: {
    UserFilled,
    Operation,
    IconMenu,
    Promotion,
    Monitor,
    OfficeBuilding,
    Stamp
  }
}

</script>

<style lang="scss" scoped>
.app-aside {
  height: 100%;
  .el-menu {
    height: 100%;
    border-right: 0 none;
  }
}
.system-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  text-align: center;
  background-color: #FFFFFF;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.15);
}
.system-title img {
  width: 32px;
  height: 32px;
  padding-right: 8px;
}
</style>
