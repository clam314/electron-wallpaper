<template>
  <div class="container">
    <main>
      <el-scrollbar :height="(mainHeight - barHeight) + 'px'">
        <div class="img-container-wrapper">
          <template v-for="(item, index) in data" :key="index">
            <div class="img-container" :style="imgSize">
              <el-image :src="item?.thumbs?.small" />
            </div>
          </template>

        </div>
      </el-scrollbar>
    </main>
    <footer>
      <el-pagination v-model:current-page="pager.current_page" :page-size="4" :page-count="pager.last_page"
        layout="prev, pager, next" />
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, ref, onUnmounted, computed, watch } from 'vue';
import { searchWallpaper } from '../../request/index'
import type { Data, Thumb, Meta } from '../../request/SearchData'
import { searchParamStore } from '@renderer/stores'

const store = searchParamStore()
store.$subscribe(() => {
  pager.current_page == 1 ? queryWallper(1) : pager.current_page = 1
})

const pager = reactive<Meta>({
  current_page: 1,
  last_page: 17,
  per_page: 0,
  total: 0,
  query: '',
  seed: ''
})

const data = reactive<Data[]>([])


const barHeight = 40 + 40 + 10
const mainHeight = ref<number>(800)
const mainWidth = ref<number>(800)
const imgSize = computed(() => {
  if (mainWidth.value > 1200) {
    return {
      width: '450px',
      height: '300px',
      padding: '10px'
    }
  }
  return {
    width: '300px',
    height: '200px',
    padding: '6px'
  }
})

const debounce = function (fn: (...arg: any[]) => any, timeout: number = 200) {
  let timer = -1
  return function (this: unknown, ...args: any[]) {
    if (timer > -1) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.bind(this)(...args)
      timer = -1
    }, timeout)
  }
}

const changeWindow = debounce(() => {
  mainHeight.value = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
  mainWidth.value = document.documentElement.clientWidth || window.innerWidth || document.body.clientWidth;
})

const queryWallper = async function (currentPage) {
  const pageInfo = await searchWallpaper(Object.assign({ page: currentPage }, store.searchParam))
  if (pageInfo.data) {
    data.length = 0
    data.push(...pageInfo.data)
  }
  if (pageInfo.meta) {
    console.log(pageInfo.meta)
    pager.current_page = pageInfo.meta.current_page
    pager.last_page = pageInfo.meta.last_page
  }
}

watch(() => pager.current_page, (value, oldwalue) => {
  console.log(value, oldwalue)
  queryWallper(value)
})

onMounted(async () => {
  mainHeight.value = (document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight);
  mainWidth.value = document.documentElement.clientWidth || window.innerWidth || document.body.clientWidth;
  window.addEventListener('resize', changeWindow)

  queryWallper(pager.current_page)
})


onUnmounted(() => {
  window.removeEventListener('resize', changeWindow)
})
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  main {
    padding-top: 10px;
    margin: 0 auto;
    flex: 1;

    .img-container-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      .img-container {
        width: 300px;
        height: 200px;
        overflow: hidden;
        border-radius: 10px;
        padding: 6px;

        .el-image {
          width: inherit;
          height: inherit;
          overflow: inherit;
          border-radius: inherit;
        }
      }
    }


  }

  footer {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-pagination {
      margin-left: -10%;
      --el-pagination-bg-color: transparent;
      --el-pagination-hover-color: var(--pagination-hover-color);
      --el-pagination-button-color: var(--pagination-text-color);
      --el-pagination-button-disabled-bg-color: transparent;
    }
  }
}
</style>