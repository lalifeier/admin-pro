<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <a href="/">
          <img class="logo" alt="logo" src="@/assets/img/logo.svg" />
          <span class="title">Admin Pro</span>
        </a>
      </div>
      <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </div>
    <div class="main">
      <div class="form">
        <el-tabs v-model="type" class="tab" stretch @tab-click="handleSetType">
          <el-tab-pane label="账号密码登录" name="account">
            <el-form ref="loginForm" :model="loginForm">
              <el-form-item prop="userName">
                <el-input v-model="loginForm.userName" size="large" name="userName" placeholder="用户名">
                  <svg-icon slot="prefix" icon-class="user" class="prefix-icon" />
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" size="large" name="password" placeholder="密码">
                  <svg-icon slot="prefix" icon-class="lock" class="prefix-icon" />
                </el-input>
              </el-form-item>
              <el-row style="margin-bottom: 24px">
                <el-col :span="8">
                  <el-checkbox v-model="loginForm.remember">自动登录</el-checkbox>
                </el-col>
                <el-col :span="6" :push="10">
                  <a href="#">忘记密码</a>
                </el-col>
              </el-row>
              <el-button style="width: 100%" size="large" type="primary" @click="handleLogin">提交</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号码登录" name="phone">
            <el-form ref="loginForm" :model="loginForm">
              <el-form-item prop="phone">
                <el-input v-model="loginForm.phone" size="large" name="phone" placeholder="手机号">
                  <svg-icon slot="prefix" icon-class="mobile" class="prefix-icon" />
                </el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <div class="captcha">
                  <el-input
                    v-model="loginForm.captcha"
                    size="large"
                    class="captcha-input"
                    name="captcha"
                    placeholder="验证码"
                  >
                    <svg-icon slot="prefix" icon-class="mail" class="prefix-icon" />
                  </el-input>
                  <el-button size="large" :disabled="captchaDisabled" @click="getCaptcha()">{{
                    captchaWord
                  }}</el-button>
                </div>
              </el-form-item>
              <el-row style="margin-bottom: 24px">
                <el-col :span="8">
                  <el-checkbox v-model="loginForm.remember">自动登录</el-checkbox>
                </el-col>
                <el-col :span="6" :push="10">
                  <a href="#">忘记密码</a>
                </el-col>
              </el-row>
              <el-button style="width: 100%" size="large" type="primary" @click="handleLogin">提交</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <footer class="footer">
      <div class="links">
        <a target="_blank" :href="github">
          <svg-icon slot="prefix" icon-class="github" />
        </a>
      </div>
      <div class="copyright">
        Copyright
        <svg-icon slot="prefix" icon-class="copyright" />
        2021 后台管理系统
      </div>
    </footer>
  </div>
</template>

<script>
import { github } from '@/config'

export default {
  name: 'Login',
  data() {
    return {
      type: 'account',
      loginForm: {
        userName: '',
        password: '',
      },
      captchaWord: '获取验证码',
      captchaDisabled: false,
      countDownTime: 60,
      timer: null,
      github,
    }
  },
  async mounted() {
    // console.log(await login())
  },
  methods: {
    handleSetType() {
      if (this.type === 'phone') {
        this.resetCaptcha()
      }
    },
    getCaptcha() {
      if (this.captchaDisabled) {
        return
      }
      this.captchaDisabled = true
      this.timer = setInterval(() => {
        this.captchaWord = `${this.countDownTime}s 后重新获取`
        this.countDownTime--
        if (this.countDownTime < 0) {
          clearInterval(this.timer)
          this.captchaWord = '重新发送验证码'
          this.countDownTime = 60
          this.captchaDisabled = false
        }
      }, 1000)
    },
    resetCaptcha() {
      clearInterval(this.timer)
      this.captchaWord = '获取验证码'
      this.countDownTime = 60
      this.captchaDisabled = false
    },
    async handleLogin() {
      await this.$store.dispatch('user/login')
      const redirect = this.$route.query.redirect
      this.$router.push({ path: redirect || '/' }).catch((err) => {
        console.log(err)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  // background-color: #f0f2f5;
  background-image: url('../../assets/img/login-background.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;

  .top {
    padding-top: 110px;
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      a {
        text-decoration: none;
      }

      .logo {
        height: 44px;
        margin-right: 16px;
        vertical-align: top;
      }

      .title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 33px;
      }
    }

    .desc {
      margin-top: 12px;
      margin-bottom: 40px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }

  .main {
    flex: 1;

    .tab {
      width: 368px;
      margin: 0 auto;

      .prefix-icon {
        color: #1890ff;
        font-size: 14px;
      }

      a {
        color: #1890ff;
        text-decoration: none;
        cursor: pointer;
      }

      .captcha {
        display: flex;

        .captcha-input {
          flex: 1;
          margin-right: 8px;
        }
      }
    }
  }

  .footer {
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, 0.45);
      }

      a:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
}

::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}

::v-deep .el-input__prefix {
  display: flex;
  align-items: center;
}
</style>
