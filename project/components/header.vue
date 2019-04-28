<template>
  <div class="layout_header">
    <div class="layout_box">
      <div class="header_logo">
        <h1>Market</h1>
      </div>
      <div class="header_nav">
        <el-menu
          :default-active="activeIndex"
          class="nav_menu_style"
          mode="horizontal"
          background-color="#ffffff"
          text-color="#777777"
          active-text-color="#000000"
          @select="handleSelect"
        >
          <el-menu-item 
            index="1" 
            class="nav_menu_item"
          >{{ $t('navbar.home') }}</el-menu-item>
          <el-menu-item 
            index="2" 
            class="nav_menu_item"
          >{{ $t('navbar.shoppingList') }}</el-menu-item>
          <el-submenu index="3">
            <p 
              slot="title" 
              class="nav_menu_item"
            >{{ $t('navbar.manager') }}</p>
            <el-menu-item
              index="3-1"
              class="nav_menu_item"
            >{{ $t('navbar.managers.product') }}</el-menu-item>
            <el-menu-item 
              index="3-2" 
              class="nav_menu_item"
            >{{ $t('navbar.managers.list') }}</el-menu-item>
            <el-menu-item 
              index="3-3"
              class="nav_menu_item"
            >{{ $t('navbar.managers.storge') }}</el-menu-item>
            <el-menu-item 
              index="3-4" 
              class="nav_menu_item"
            >{{ $t('navbar.managers.supplier') }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push({ name: 'index' })
          break
        case '3-1':
          this.$router.push({ name: 'product' })
          break
        case '2':
          this.$router.push({ name: 'list' })
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
  padding: 1px;
  text-align: center;
}
.layout_box {
  margin: 0 auto;
  width: 1200px;
  height: 70px;
}
.header_logo {
  width: 200px;
  height: 100%;
  float: left;
}
.header_nav {
  width: 800px;
  height: 100%;
  float: left;
}
.nav_menu_style {
  width: 100%;
  height: 100%;
}
.nav_menu_item {
  height: 100%;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
}
.el-menu--horizontal > .el-submenu {
  height: 100%;
}
.el-menu--horizontal > .el-submenu >>> .el-submenu__title {
  height: 100%;
}
.header_globalization {
  height: 100%;
  width: 199;
  float: left;
  border-left: 1px solid gray;
  padding-left: 10px;
}
.header_globalization span {
  display: block;
}
.el-dropdown-link {
  cursor: pointer;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  line-height: 65px;
  height: 100%;
}
.el-menu--horizontal >>> .el-submenu .el-submenu__icon-arrow {
  visibility: hidden;
}
</style>
