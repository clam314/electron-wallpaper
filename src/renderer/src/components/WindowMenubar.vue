<template>
  <div class="menu-bar">
    <div class="icon" @click="minClick">
      <el-icon>
        <Minus />
      </el-icon>
    </div>
    <div class="icon" @click="maxClick">
      <el-icon>
        <FullScreen />
      </el-icon>
    </div>
    <div class="icon" @click="closeClick">
      <el-icon>
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Minus, FullScreen, Close } from '@element-plus/icons-vue'
const ipcRenderer = window.ipcRenderer
const minClick = (): void => ipcRenderer.send('window-min')
const maxClick = (): void => ipcRenderer.send('window-max')
const closeClick = (): void => ipcRenderer.send('window-close')
</script>

<style lang="less" scoped>
.menu-bar {
  height: var(--navbar-height);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  -webkit-app-region: drag;

  .icon {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: no-drag;

    &:hover {
      background-color: var(--navbar-btn-hover-color);
      border-radius: 3px;
    }
  }
}
</style>