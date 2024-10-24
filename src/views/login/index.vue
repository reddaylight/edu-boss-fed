<template>
    <div class="login">
      <video autoplay muted loop>
        <source src="https://pub.ddimg.mobi/promo-admin-service/100meindex_01_32_010a3019fe0e481aab1e37bbe3d7b3eb.mp4">
      </video>
      <div class="glass-box"></div>
      <div class="login-banner">
        <el-carousel height="400px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="login-from">
        <h1>欢迎使用企业管理后台</h1>
        <el-form :model="form" :rules="rules" label-position="top" label-width="auto" style="max-width: 600px">
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loginLoding" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
// import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import qs from 'qs'
// import { login } from '@/services/user'

export default {
  name: 'loginIndex',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loginLoding: false,
      rules: {
        username: [
          { required: true, message: '请输入登录用户名' }
        ],
        password: [
          { required: true, message: '请输入登录密码' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      this.loginLoding = true
      console.log(qs.stringify(this.from))
      try {
        await true
        // const { data } = await login(this.form)
        const data = {
          status: 1
        }
        console.log(data)
        if (data.status === 1) {
          this.$router.push({
            name: 'home'
          })
          ElMessage({
            message: '登录成功!',
            type: 'success'
          })
        }
      } catch (err) {
        console.log('出问题了')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f6f7fb;
}
.login >* {
  z-index: 3;
}
.login video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
.glass-box {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(3px);
  z-index: 1;
}
.login-banner {
  box-sizing: border-box;
  width: 300px;
  height: auto;
  padding: 16px;
  background-color: #fff;
}
.login-from {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 432px;
  padding: 32px;
  background-color: #fff;
}

.login-from h1 {
  letter-spacing: 2px;
  margin-top: 0;
  margin-bottom: 48px;
}

.el-form-item {
  width: 340px;
  margin-bottom: 40px;
}

.el-form-item__content button {
  margin-top: 40px;
  width: 340px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel {
  --el-carousel-indicator-width: 24px;
}
</style>
