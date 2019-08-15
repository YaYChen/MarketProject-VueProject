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
                <p 
                  slot="title" 
                >{{ $t('navbar.manager') }}</p>
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
            <a @click="signIn">Sign In</a>
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
                <el-dropdown-item command="a">Sing Out</el-dropdown-item>
                <el-dropdown-item command="b">Detial</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
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
      loginIn: false,
      loginOut: true
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
          this.showDetial()
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
    showDetial() {}
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
}
</style>
