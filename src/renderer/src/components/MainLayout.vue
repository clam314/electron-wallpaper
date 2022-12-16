<template>
    <el-container>
        <el-header>
            <window-menubar :show="showSearchBar" />
        </el-header>
        <el-container class="app-container">
            <el-aside class="app-container-aside">
                <div class="app-container-aside-logo">
                    <el-avatar size="large" :src="logoImg" />
                </div>
                <el-menu :default-active="'home'" :collapse="true" router @select="menuSelected">
                    <el-menu-item index="home">
                        <el-icon :size="iconSize"><icon-menu /></el-icon>
                        <span>壁纸</span>
                    </el-menu-item>
                    <el-menu-item index="download">
                        <el-icon :size="iconSize">
                            <download />
                        </el-icon>
                        <span>下载</span>
                    </el-menu-item>
                    <el-menu-item index="setting">
                        <el-icon :size="iconSize">
                            <setting />
                        </el-icon>
                        <span>设置</span>
                    </el-menu-item>
                </el-menu>
                <div class="app-container-aside-version">
                </div>
            </el-aside>

            <el-main class="app-container-main">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script lang="ts" setup>
import { Menu as IconMenu, Setting, Download } from '@element-plus/icons-vue'
import logoImg from "../assets/logo.jpg"
import WindowMenubar from './WindowMenubar.vue'
import { ref, computed } from 'vue';

const iconSize = 30;
const activePath = ref<string>('home')
const showSearchBar = computed((): boolean => {
    return activePath.value === 'home'
})
const menuSelected = function (index: string): void {
    activePath.value = index
}
</script>
  
<style lang="less" scoped>
.el-header {
    padding: 0;
    height: auto;
}

.app-container {
    height: 100%;

    .el-main {
        --el-main-padding: 0px;
    }

    &-aside {
        height: 100%;
        width: 80px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: var(--menu-bg-color);
        border-radius: 30px;
        margin-left: 10px;
        margin-right: 10px;
        position: relative;
        bottom: 10px;


        &-logo {
            margin-top: 0px;
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .el-menu {
            --el-menu-bg-color: transparent;
            border-right: none;

            .el-menu-item {
                margin-top: 15px;
                --el-menu-text-color: var(--menu-text-color);
                --el-menu-active-color: var(--menu-active-color);
                transition: none;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            }
        }
    }
}
</style>
  