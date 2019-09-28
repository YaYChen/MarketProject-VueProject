<template>
  <div class="layout_main">
    <div class="top_line_div"/>
    <div class="layout_center">
      <div class="login_logo_continer">
        <div class="login_logo">
          Market
        </div>
        <div class="login_Description">
          {{ $t('login.signInTitle') }}
        </div>
        <div class="login_continer">
          <div class="login_div">
            <el-form 
              :model="login_user" 
              :rules="rules" >
              <el-form-item 
                :label="$t('user.loginName')" 
                prop="loginName">
                <el-input v-model="login_user.loginName"/>
              </el-form-item>
              <el-form-item 
                :label="$t('user.password')" 
                prop="password">
                <el-input
                  v-model="login_user.password"
                  type="password"/>
              </el-form-item>              
              <el-form-item>
                <el-button 
                  class="login_button"
                  type="primary" 
                  round
                  @click="loginIn">{{ $t('button.login') }}</el-button>
              </el-form-item>
              <el-form-item>
                <div 
                  class="SignUp_tips"
                  @click="showSingUpDialog">
                  ——{{ $t('login.singUpTitle') }}——
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login_button" 
                  round>{{ $t('login.loginAsManager') }}</el-button>
              </el-form-item>
            </el-form>
          </div>          
        </div>
      </div>
    </div>
    <app-footer/>
    <el-dialog
      :visible.sync="singUpDialogVisible"
      :title="$t('dialog.signUp')"
      width="30%">
      <el-form 
        :model="singUp_user" 
        :rules="rules_singUp" >
        <el-form-item 
          :label="$t('user.loginName')" 
          prop="loginName">
          <el-input v-model="singUp_user.loginName"/>
        </el-form-item>
        <el-form-item 
          :label="$t('user.userName')" 
          prop="userName">
          <el-input v-model="singUp_user.userName"/>
        </el-form-item>
        <el-form-item 
          :label="$t('user.password')" 
          prop="password">
          <el-input
            v-model="singUp_user.password"
            type="password"/>
        </el-form-item>
        <el-form-item 
          :label="$t('user.passwordAgain')" 
          prop="password_repeat">
          <el-input
            v-model="singUp_user.password_repeat"
            type="password"/>
        </el-form-item>
        <el-form-item 
          :label="$t('user.mobile')" 
          prop="user_mobile">
          <el-input
            v-model="singUp_user.userMobile"/>
        </el-form-item>
      </el-form>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button 
          @click="singUpDialogVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button 
          type="primary" 
          @click="singUp">{{ $t('button.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    'app-footer': Footer
  },
  data: function() {
    return {
      login_user: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' }
        ]
      },
      singUpDialogVisible: false,
      singUp_user: {
        loginName: '',
        userName: '',
        password: '',
        password_repeat: '',
        userMobile: ''
      },
      rules_singUp: {
        loginName: [
          { required: true, message: '请输入用户登陆名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 8, message: '长度大于 8 个字符', trigger: 'blur' }
        ],
        password_repeat: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 8, message: '长度大于 8 个字符', trigger: 'blur' }
        ],
        userMobile: [
          { required: true, message: '请输入用户手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    loginIn() {
      let vm = this
      var postData = JSON.stringify(vm.login_user)
      vm.$axios
        .post('/sign-in', postData, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(({ data }) => {
          if (data.message != 'Success!') {
            vm.$message.error(data.message)
          } else {
            let user = {
              userId: data.userId,
              userName: data.userName,
              token: data.token
            }
            Cookies.set('user', user)
            vm.$store.dispatch('user/addUser', user)
            vm.$router.back(-1)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    singUp() {
      let vm = this
      if (vm.singUp_user.password !== vm.singUp_user.password_repeat) {
        vm.$message({
          message: 'Please re-enter your password...',
          type: 'warning'
        })
        return
      }
      let postData = JSON.stringify(vm.singUp_user)
      vm.$axios
        .post('/sign-up', postData, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(response => {
          if (response.data.message === 'Success!') {
            alert(response.data.message)
          } else {
            alert(response.data.message)
          }
        })
        .catch(function(error) {
          vm.$message({
            message: error,
            type: 'warning'
          })
        })
      vm.singUpDialogVisible = false
    },
    showSingUpDialog() {
      let vm = this
      vm.singUp_user = {
        loginName: '',
        password: '',
        password_repeat: '',
        userMobile: ''
      }
      vm.singUpDialogVisible = true
    }
  }
}
</script>

<style>
.layout_main {
  width: 100%;
  height: auto;
}
.top_line_div {
  width: 100%;
  height: 10px;
  background-color: black;
  position: fixed;
  top: 0;
  z-index: 9;
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
  color: lightgray;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.SignUp_tips:hover {
  color: black;
}
.el-form-item__label {
  font-size: 20px;
}
</style>
