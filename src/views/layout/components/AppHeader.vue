<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        menu-trigger="click"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
    <el-menu-item index="0">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
            <a href="/">promotion management</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
    </el-menu-item>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu  class="user-center-menu" index="2">
      <template #title>
        <el-avatar style="background-color: #409EFF;"> {{ userInfo.name.charAt(0) }} </el-avatar>
        <div class="userInfo">
          <span>{{ userInfo.name }}</span>
          <span>{{ userInfo.companyName }}</span>
        </div>
      </template>
      <el-menu-item class="el-menu-item-first" disabled=true>
        <div class="bg" style="display: block;  width: 300px; height: 120px; background-color: #409EFF;"></div>
      </el-menu-item>
      <el-menu-item index="2-1"><el-icon><company-switch /></el-icon>切换企业</el-menu-item>
      <el-menu-item index="2-2"><el-icon><user-center /></el-icon>个人中心</el-menu-item>
      <el-divider style="margin: 4px 0px 4px 16px; width: 268px;" />
      <el-menu-item index="2-3"><el-icon><user-logout /></el-icon>退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import {
  Switch as CompanySwitch,
  User as UserCenter,
  Close as UserLogout
} from '@element-plus/icons-vue'

export default {
  name: 'AppHeader',
  components: {
    CompanySwitch,
    UserCenter,
    UserLogout
  },
  data () {
    return {
      userInfo: {
        name: '张三',
        companyName: '纽业态（上海）信息科技有限公司'
      }
    }
  }
}
</script>

<style lang="scss">

.el-menu--horizontal {
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.15);
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
  border: 0;
}
.el-menu--horizontal.el-menu {
    border: 0;
}

.userInfo {
  display: flex;
  flex-wrap: wrap;
  margin: 0 8px;
}

.userInfo span {
  height: 21px;
  line-height: 21px;
  flex: 1 0 100%;
  color: #7F7F7F;
  font-size: small;
}

.userInfo span:first-child {
  color: #4E5969;
  font-weight: 600;
}

.el-menu--popup {
  padding: 0 !important;
}

.el-menu--horizontal .el-menu .el-menu-item {
  padding-left: 16px;
  font-size: larger;
  height: 48px;
  margin: 4px 4px;
  border-radius: 5px
}
.el-menu--horizontal .el-menu .el-menu-item-first {
  padding: 0;
  margin: 0;
  height: 120px;
}

</style>
