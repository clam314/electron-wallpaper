<template>
    <div class="search-bar-wrapper">
        <div class="search-bar">
            <el-icon>
                <Search />
            </el-icon>
            <input v-model="searchText" />
        </div>
        <el-icon v-if="searchText" class="close-btn" @click="() => searchText = ''">
            <CloseBold />
        </el-icon>
    </div>
</template>
<script lang="ts" setup>
import { Search, CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue';

const searchText = ref<string>('')
</script>
<style lang="less" scoped>
.search-bar-wrapper {
    height: 80%;
    width: 50%;
    max-width: 500px;
    padding: 0 20px;
    background-color: var(--search-bar-color);
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-app-region: no-drag;

    .search-bar {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 20px;

        input {
            margin-left: 10px;
            flex: 1;
        }
    }
}
</style>