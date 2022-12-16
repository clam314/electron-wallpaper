<template>
  <div class="menu-bar">
    <SearchBar class="search-bar" v-if="show" />
    <div class="nav-btn-container">
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
  </div>
</template>

<script setup lang="ts">
import { Minus, FullScreen, Close } from '@element-plus/icons-vue'
import SearchBar from './SearchBar.vue';

defineProps({
  show: { type: Boolean, default: true }
})

const ipcRenderer = window.ipcRenderer
const minClick = (): void => ipcRenderer.send('window-min')
const maxClick = (): void => ipcRenderer.send('window-max')
const closeClick = (): void => ipcRenderer.send('window-close')
</script>

<style lang="less" scoped>
.menu-bar {
  height: var(--navbar-height);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  -webkit-app-region: drag;

  .nav-btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 0;

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

}
</style>