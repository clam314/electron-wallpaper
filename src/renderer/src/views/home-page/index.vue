<template>
  <div class="container">
    <main>
      <el-scrollbar ref="scrollbarRef" :height="(mainHeight - barHeight) + 'px'">
        <div class="img-container-wrapper">
          <template v-for="(item, index) in data" :key="index">
            <div class="img-container" :class="{ 'thumb-border': item.purity !== 'sfw' }" :style="imgSize">
              <el-image :src="item?.thumbs?.small" :preview-src-list="[item.path]" :lazy="true">
              </el-image>
              <div class="thumb-info">
                <div class="thumb-info-box">
                  {{ item.favorites }}
                  <el-icon>
                    <StarFilled />
                  </el-icon>
                </div>
                <span class="wall-res">{{ item.resolution }}</span>
                <div class="thumb-info-box">
                  {{ item.views }}
                  <el-icon>
                    <View />
                  </el-icon>
                </div>
              </div>
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
import { StarFilled, View } from '@element-plus/icons-vue'
import { reactive, onMounted, ref, onUnmounted, computed, watch } from 'vue';
import { searchWallpaper } from '../../request/index'
import type { Data, Meta } from '../../request/SearchData'
import { searchParamStore } from '@renderer/stores'
import type { ElScrollbar } from 'element-plus'
import { ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css'

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
      margin: '10px'
    }
  }
  return {
    width: '300px',
    height: '200px',
    margin: '6px'
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

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const queryWallper = async function (currentPage) {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    const pageInfo = await searchWallpaper(Object.assign({ page: currentPage, apikey: '4yiobr45qi3fhpfisMBwrSsxUcNIaSJ5' }, store.searchParam))
    if (pageInfo.data) {
      data.length = 0
      data.push(...pageInfo.data)
    }
    if (pageInfo.meta) {
      console.log(pageInfo.meta)
      pager.current_page = pageInfo.meta.current_page
      pager.last_page = pageInfo.meta.last_page
    }
    scrollbarRef.value?.setScrollTop(0)
  } catch (error) {

  } finally {
    loading.close()
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

      .thumb-border {
        border: 2px solid rgba(255, 200, 64, .8);
        box-shadow: inset 0 0 4px rgb(0 0 0 / 75%);
      }

      .img-container {
        width: 300px;
        height: 200px;
        overflow: hidden;
        border-radius: 8px;
        margin: 6px;

        .el-image {
          width: inherit;
          height: inherit;
          overflow: inherit;
          background-color: var(--image-placeholder-bg);

          :deep(.el-image__placeholder) {
            background-color: transparent;
          }
        }

        &:hover .thumb-info {
          bottom: 1.6em !important;
        }

        .thumb-info {
          width: 100%;
          height: 1.5em;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          position: relative;
          bottom: 0;
          background-color: rgba(0, 0, 0, .165);
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, .03) 0, rgba(0, 0, 0, .3) 100%);
          transition: bottom 0.3s linear;


          .thumb-info-box {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 0 10px;
            font-size: 14px;

            .el-icon {
              margin-left: 3px;
              font-size: 16px;
            }
          }
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