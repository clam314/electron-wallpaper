<template>
    <el-container class="app-container">
        <el-aside class="app-container-aside">
            <div class="app-container-aside-logo">
                <el-avatar size="large" :src="logoImg" />
            </div>
            <el-menu default-active="/home" :collapse="true" router>
                <el-menu-item index="/home">
                    <el-icon><icon-menu /></el-icon>
                    <span>壁纸</span>
                </el-menu-item>
                <el-menu-item index="/download">
                    <el-icon>
                        <download />
                    </el-icon>
                    <span>下载</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>设置</span>
                </el-menu-item>
            </el-menu>
            <div class="app-container-aside-version">
                <p>版本 1.0.0</p>
            </div>
        </el-aside>

        <el-main class="app-container-main">
            <router-view />
        </el-main>
    </el-container>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Setting, Download } from '@element-plus/icons-vue'
import logoImg from "../assets/logo.jpg"

</script>
  
<style lang="less" scoped>
.app-container {
    height: 100vh;

    &-aside {
        height: 100%;
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        -webkit-app-region: drag;

        &-logo {
            margin-top: 30px;
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-version {
            position: absolute;
            bottom: 30px;
        }

        .el-menu {
            --el-menu-bg-color: transparent;
            border-right: none;

            .el-menu-item {
                --el-menu-active-color: white;
            }
        }
    }
}
</style>
  