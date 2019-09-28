<template>
  <div class="layout_header">
    <div class="layout_box">
      <el-row>
        <el-col :span="4">
          <div class="header_logo">
            Market
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              background-color="#ffffff"
              text-color="#777777"
              active-text-color="#000000"
              @select="handleSelect"
            >
              <el-menu-item 
                index="1" 
              >{{ $t('navbar.home') }}</el-menu-item>
              <el-menu-item 
                index="2" 
              >{{ $t('navbar.shoppingList') }}</el-menu-item>
              <el-submenu index="3">
                <template slot="title">{{ $t('navbar.manager') }}</template>
                <el-menu-item
                  index="3-1"
                >{{ $t('navbar.managers.product') }}</el-menu-item>
                <el-menu-item 
                  index="3-2" 
                >{{ $t('navbar.managers.list') }}</el-menu-item>
                <el-menu-item 
                  index="3-3"
                >{{ $t('navbar.managers.storge') }}</el-menu-item>
                <el-menu-item 
                  index="3-4" 
                >{{ $t('navbar.managers.supplier') }}</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="header_globalization">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ $t('language.name') }}
                <i class="el-icon-arrow-down el-icon--right"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">中文</el-dropdown-item>
                <el-dropdown-item command="b">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="3">
          <div 
            v-show="loginOut" 
            class="header_login">
            <a @click="signIn">{{ $t('login.signIn') }}</a>
          </div>
          <div 
            v-show="loginIn" 
            class="header_login">
            <el-dropdown @command="handleCommanduser">
              <span class="el-dropdown-link">
                {{ user.userName }}
                <i class="el-icon-arrow-down el-icon--right"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">{{ $t('login.signOut') }}</el-dropdown-item>
                <el-dropdown-item command="b">{{ $t('login.details') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="detailDialogVisible"
      :title="$t('login.details')"
      width="50%"
      append-to-body>
      <div>
        <div class="detail_title_div">{{ $t('user.userInfo') }}</div>
        <div class="user_detail_div">{{ $t('user.loginName') }}: {{ userInfo.loginName }}</div>
        <div class="user_detail_div">{{ $t('user.userName') }}: {{ userInfo.userName }}</div>
        <div class="user_detail_div">{{ $t('user.mobile') }}: {{ userInfo.userMobile }}</div>
        <div class="user_detail_div">{{ $t('user.createdTime') }}: {{ userInfo.createdTime }}</div>
        <div class="detail_edit_div">
          <el-button 
            type="primary" 
            @click="showEditerDialog">{{ $t('button.edit') }}</el-button>
        </div>
        <div>
          <div class="detail_title_div">{{ $t('login.logoinHeistories') }}: </div>
          <div class="time_line_div">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp">
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="editDialogVisible"
        :title="$t('dialog.titleEdit')"
        width="30%"
        append-to-body>
        <el-form 
          :model="userInfoEdit" 
          :rules="rules_userInfo" >
          <el-form-item 
            :label="$t('user.userName')" 
            prop="userName">
            <el-input v-model="userInfoEdit.userName"/>
          </el-form-item>
          <el-form-item 
            :label="$t('user.mobile')" 
            prop="user_mobile">
            <el-input
              v-model="userInfoEdit.userMobile"/>
          </el-form-item>              
        </el-form>
        <span 
          slot="footer" 
          class="dialog-footer">
          <el-button @click="editDialogVisible = false">{{ $t('button.cancel') }}</el-button>
          <el-button 
            type="primary" 
            @click="updateUserInfo">{{ $t('button.confirm') }}</el-button>
        </span>
      </el-dialog>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button 
          type="primary" 
          @click="detailDialogVisible = false">{{ $t('button.heidden') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  props: {
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      user: {
        userId: '',
        userName: ''
      },
      userInfo: {
        loginName: '',
        userName: '',
        userMobile: '',
        timestamp: ''
      },
      loginIn: false,
      loginOut: true,
      detailDialogVisible: false,
      activities: [],
      editDialogVisible: false,
      userInfoEdit: {},
      rules_userInfo: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        userMobile: [
          { required: true, message: '请输入用户手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let vm = this
    let user = JSON.parse(Cookies.get('user') || null)
    if (user !== null) {
      vm.$store.dispatch('user/addUser', user)
      vm.user.userId = vm.$store.state.user.userInfo.userId
      vm.user.userName = vm.$store.state.user.userInfo.userName
      vm.loginIn = true
      vm.loginOut = false
    } else {
      vm.loginIn = false
      vm.loginOut = true
      vm.$router.push({ name: 'login' })
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push({ name: 'index' })
          break
        case '2':
          this.$router.push({ name: 'list' })
          break
        case '3-1':
          this.$router.push({ name: 'product' })
          break
        case '3-2':
          this.$router.push({ name: 'sales' })
          break
        case '3-4':
          this.$router.push({ name: 'supplier' })
          break
        default:
          break
      }
    },
    handleCommand(command) {
      switch (command) {
        case 'a':
          this.$i18n.locale = 'zh'
          break
        case 'b':
          this.$i18n.locale = 'en'
          break
        default:
          break
      }
    },
    handleCommanduser(command) {
      switch (command) {
        case 'a':
          this.signOut()
          break
        case 'b':
          this.showdetail()
          break
        default:
          break
      }
    },
    signIn() {
      this.$router.push({ name: 'login' })
    },
    signOut() {
      let vm = this
      vm.user = {
        userId: '',
        userName: ''
      }
      Cookies.remove('user')
      vm.$store.dispatch('user/deleteUser')
      vm.loginIn = false
      vm.loginOut = true
    },
    showdetail() {
      let vm = this
      vm.getUserInfo()
    },
    getUserInfo() {
      let vm = this
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .get('/p/user-detail', {
            headers: {
              Authorization: token
            }
          })
          .then(response => {
            let data = response.data
            console.log(response)
            vm.userInfo = {
              loginName: data.loginName,
              userName: data.userName,
              userMobile: data.userMobile,
              createdTime: data.genTime
            }
            vm.getUserHistories()
          })
          .catch(error => {
            if (error.request && error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$message({
                message: error,
                type: 'warning'
              })
            }
          })
      }
    },
    getUserHistories() {
      let vm = this
      vm.activities = []
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .get('/p/login-histories', {
            headers: {
              Authorization: token
            }
          })
          .then(response => {
            let data = response.data
            console.log(response)
            vm.activities = []
            data.forEach(element => {
              let item = {
                content: 'Login',
                timestamp: element.loginDate
              }
              vm.activities.push(item)
            })
            vm.activities[0].size = 'large'
            vm.activities[0].color = '#0bbd87'
            vm.detailDialogVisible = true
          })
          .catch(error => {
            if (error.request && error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$message({
                message: error,
                type: 'warning'
              })
            }
          })
      }
    },
    showEditerDialog() {
      let vm = this
      vm.userInfoEdit = {
        userName: vm.userInfo.userName,
        userMobile: vm.userInfo.userMobile
      }
      vm.editDialogVisible = true
    },
    updateUserInfo() {
      let vm = this
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        let postData = JSON.stringify(vm.userInfoEdit)
        vm.$axios
          .post('/p/update-user-detail', postData, {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: token
            }
          })
          .then(response => {
            if (response.data.message === 'Success!') {
              alert(response.data.message)
              vm.getUserInfo()
            } else {
              alert(response.data.message)
            }
            vm.editDialogVisible = false
          })
          .catch(function(error) {
            vm.$message({
              message: error,
              type: 'warning'
            })
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout_header {
  height: auto;
  width: 100%;
  margin-bottom: 10px;
  border-top: 3px solid black;
  border-bottom: 1px solid gray;
  text-align: center;
}
.layout_box {
  margin: 0 auto;
  width: 1200px;
  height: 70px;
  padding: 1px;
}
.header_logo {
  height: 70px;
  line-height: 70px;
  font-family: 'Microsoft YaHei';
  font-size: 30px;
  font-weight: bold;
}
.header_globalization {
  border-right: 1px solid gray;
}
.header_globalization span {
  display: block;
}
.el-dropdown-link {
  cursor: pointer;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  line-height: 70px;
  height: 70px;
}
.el-menu--horizontal >>> .el-submenu .el-submenu__title {
  height: 70px;
  font-size: 20px;
}
.el-menu--horizontal >>> .el-menu-item {
  height: 70px;
  font-size: 20px;
}
.header_login {
  height: 70px;
  line-height: 70px;
  cursor: pointer;
}
.detail_title_div {
  font-family: 'Microsoft YaHei';
  font-size: 25px;
  line-height: 30px;
  height: 30px;
  border-left: 2px solid black;
  padding-left: 10px;
  color: black;
}
.user_detail_div {
  margin: 10px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  line-height: 30px;
  height: 30px;
}
.time_line_div {
  margin-top: 5px;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
}
.detail_edit_div {
  text-align: right;
  padding-right: 10px;
}
</style>
