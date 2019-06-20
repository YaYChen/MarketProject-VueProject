<template>
  <div class="layout_main">
    <div class="layout_center">
      <div class="login_logo_continer">
        <div class="login_logo">
          Market
        </div>
        <div class="login_Description">
          Sign in to your account
        </div>
        <div class="login_continer">
          <div class="login_div">
            <el-form 
              :model="login_user" 
              :rules="rules" >
              <el-form-item 
                label="User Name" 
                prop="name">
                <el-input/>
              </el-form-item>
              <el-form-item 
                label="Password" 
                prop="password">
                <el-input type="password"/>
              </el-form-item>              
              <el-form-item>
                <el-button 
                  class="login_button"
                  type="primary" 
                  round>Sign In</el-button>
              </el-form-item>
              <el-form-item>
                <div class="SignUp_tips">
                  ——Don't have an account?——
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login_button" 
                  round>Create a new account </el-button>
              </el-form-item>
            </el-form>
          </div>          
        </div>
      </div>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'

export default {
  components: {
    'app-footer': Footer
  },
  data: function() {
    return {
      login_user: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {}
}
</script>

<style>
.layout_main {
  width: 100%;
  height: auto;
}
.layout_center {
  width: 100%;
  min-height: 600px;
  margin: 10px auto;
}
.login_logo_continer {
  width: 100%;
  height: 100px;
  line-height: 100px;
}
.login_logo {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 60px;
  font-family: 'Microsoft YaHei';
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.login_Description {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 30px;
  font-family: 'Microsoft YaHei';
  font-size: 35px;
  text-align: center;
}
.login_continer {
  width: 100%;
  margin-top: 20px;
}
.login_div {
  margin: 0 auto;
  width: 360px;
  border-radius: 8px;
  box-shadow: 0 1px 5px 0 lightgray;
  padding: 14px 30px 27px;
}
.login_button {
  width: 100%;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
}
.SignUp_tips {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.el-form-item__label {
  font-size: 20px;
}
</style>
