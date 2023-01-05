<template>
    <div class="container">
        <div class="search-bar-wrapper">
            <div class="search-bar">
                <el-icon>
                    <Search />
                </el-icon>
                <input v-model="searchText" @keydown.enter.prevent="clickSearch" />
            </div>
            <el-icon v-if="searchText" class="close-btn" @click="() => searchText = ''">
                <CloseBold />
            </el-icon>
        </div>
        <div class="operation-btn-wrapper">
            <el-icon class="operation-btn" @click="clickOperation">
                <Operation />
            </el-icon>
        </div>
        <el-drawer class="search-drawer" v-model="showDrawer" :with-header="false" :size="'35%'">
            <div id="search-sorting-checks" class="framed">
                <input type="radio" value="relevance" id="search-relevance" v-model="sorting">
                <label for="search-relevance">Relevance</label>
                <input type="radio" value="random" id="search-random" v-model="sorting">
                <label for="search-random">Random</label>
                <input type="radio" value="date_added" id="search-date" v-model="sorting">
                <label for="search-date">Date Added</label>
                <input type="radio" value="views" id="search-views" v-model="sorting">
                <label for="search-views">Views</label>
                <input type="radio" value="favorites" id="search-favorites" v-model="sorting">
                <label for="search-favorites">Favorites</label>
                <input type="radio" value="toplist" id="search-toplist" v-model="sorting">
                <label for="search-toplist">Toplist</label>
                <input type="radio" value="hot" id="search-hot" v-model="sorting">
                <label for="search-hot">Hot</label>
                <input type="checkbox" name="order" value="desc" id="search-order" v-model="order">
                <label for="search-order" original-title="Ascending/Descending">
                    <el-icon style="height: 100%;" v-if="isDesc">
                        <Bottom />
                    </el-icon>
                    <el-icon style="height: 100%;" v-if="!isDesc">
                        <Top />
                    </el-icon>
                </label>
            </div>
            <hr />
            <div id="search-category-checks" class="framed">
                <input type="checkbox" value="general" id="search-general" v-model="categoriesSelected">
                <label for="search-general">General</label>
                <input type="checkbox" value="anime" id="search-anime" v-model="categoriesSelected">
                <label for="search-anime">Anime</label>
                <input type="checkbox" value="people" id="search-people" v-model="categoriesSelected">
                <label for="search-people">People</label>
            </div>
            <div id="search-purity-checks" class="framed">
                <input type="checkbox" value="sfw" id="search-sfw" v-model="puritySelected">
                <label class="purity sfw" for="search-sfw">SFW</label>
                <input type="checkbox" value="sketchy" id="search-sketchy" v-model="puritySelected">
                <label class="purity sketchy" for="search-sketchy">Sketchy</label>
                <input type="checkbox" value="nsfw" id="search-nsfw" v-model="puritySelected">
                <label class="purity nsfw" for="search-nsfw">NSFW</label>
            </div>
            <hr />
            <div class="resolution-wrapper respicker-wrapper">
                <div class="framed">
                    <input type="radio" id="searchbar-respicker-atleast" value="atleast" v-model="limit">
                    <label for="searchbar-respicker-atleast">At Least</label>
                    <input type="radio" id="searchbar-respicker-exactly" value="exactly" v-model="limit">
                    <label for="searchbar-respicker-exactly">Exactly</label>
                </div>
                <div class="respicker">
                    <p class="respicker-native-info">Your screen resolution is <strong><em>{{ windowSize[0]}} ×
                                {{ windowSize[1]}}</em></strong>.
                    </p>
                    <table class="label-table">
                        <thead>
                            <tr>
                                <th>Ultrawide</th>
                                <th>16:9</th>
                                <th>16:10</th>
                                <th>4:3</th>
                                <th>5:4</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-2560x1080" value="2560x1080">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-2560x1080" value="2560x1080">
                                    <label for="searchbar-respicker-2560x1080" original-title="Dual 1080p">2560 ×
                                        1080</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1280x720" value="1280x720">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1280x720" value="1280x720">
                                    <label for="searchbar-respicker-1280x720" original-title="">1280 ×
                                        720</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1280x800" value="1280x800">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1280x800" value="1280x800">
                                    <label for="searchbar-respicker-1280x800" original-title="">1280 ×
                                        800</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1280x960" value="1280x960">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1280x960" value="1280x960">
                                    <label for="searchbar-respicker-1280x960" original-title="">1280 ×
                                        960</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1280x1024" value="1280x1024">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1280x1024" value="1280x1024">
                                    <label for="searchbar-respicker-1280x1024" original-title="">1280
                                        × 1024</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-3440x1440" value="3440x1440">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-3440x1440" value="3440x1440">
                                    <label for="searchbar-respicker-3440x1440" original-title="">3440
                                        × 1440</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1600x900" value="1600x900">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1600x900" value="1600x900">
                                    <label for="searchbar-respicker-1600x900" original-title="">1600 ×
                                        900</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1600x1000" value="1600x1000">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1600x1000" value="1600x1000">
                                    <label for="searchbar-respicker-1600x1000" original-title="">1600
                                        × 1000</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1600x1200" value="1600x1200">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1600x1200" value="1600x1200">
                                    <label for="searchbar-respicker-1600x1200" original-title="">1600
                                        × 1200</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1600x1280" value="1600x1280">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1600x1280" value="1600x1280">
                                    <label for="searchbar-respicker-1600x1280" original-title="">1600
                                        × 1280</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-3840x1600" value="3840x1600">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-3840x1600" value="3840x1600">
                                    <label for="searchbar-respicker-3840x1600" original-title="">3840
                                        × 1600</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1920x1080" value="1920x1080">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1920x1080" value="1920x1080">
                                    <label for="searchbar-respicker-1920x1080" original-title="Full HD">1920 ×
                                        1080</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1920x1200" value="1920x1200">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1920x1200" value="1920x1200">
                                    <label for="searchbar-respicker-1920x1200" original-title="">1920
                                        × 1200</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1920x1440" value="1920x1440">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1920x1440" value="1920x1440">
                                    <label for="searchbar-respicker-1920x1440" original-title="">1920
                                        × 1440</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-1920x1536" value="1920x1536">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-1920x1536" value="1920x1536">
                                    <label for="searchbar-respicker-1920x1536" original-title="">1920
                                        × 1536</label>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-2560x1440" value="2560x1440">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-2560x1440" value="2560x1440">
                                    <label for="searchbar-respicker-2560x1440" original-title="">2560
                                        × 1440</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-2560x1600" value="2560x1600">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-2560x1600" value="2560x1600">
                                    <label for="searchbar-respicker-2560x1600" original-title="">2560
                                        × 1600</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-2560x1920" value="2560x1920">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-2560x1920" value="2560x1920">
                                    <label for="searchbar-respicker-2560x1920" original-title="">2560
                                        × 1920</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-2560x2048" value="2560x2048">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-2560x2048" value="2560x2048">
                                    <label for="searchbar-respicker-2560x2048" original-title="">2560
                                        × 2048</label>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-3840x2160" value="3840x2160">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-3840x2160" value="3840x2160">
                                    <label for="searchbar-respicker-3840x2160" original-title="4k">3840 × 2160</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-3840x2400" value="3840x2400">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-3840x2400" value="3840x2400">
                                    <label for="searchbar-respicker-3840x2400" original-title="">3840
                                        × 2400</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-3840x2880" value="3840x2880">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-3840x2880" value="3840x2880">
                                    <label for="searchbar-respicker-3840x2880" original-title="">3840
                                        × 2880</label>
                                </td>
                                <td>
                                    <input v-if="isAtLast" type="radio" v-model="atleast"
                                        id="searchbar-respicker-3840x3072" value="3840x3072">
                                    <input v-else type="checkbox" v-model="resolutions"
                                        id="searchbar-respicker-3840x3072" value="3840x3072">
                                    <label for="searchbar-respicker-3840x3072" original-title="">3840
                                        × 3072</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
            <div class="roportion-wrapper respicker-wrapper">
                <div class="respicker">
                    <table class="label-table">
                        <thead>
                            <tr>
                                <th style="width: 25%;">Wide</th>
                                <th style="width: 25%;">Ultrawide</th>
                                <th style="width: 25%;">Portrait</th>
                                <th style="width: 25%;">Square</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <input type="checkbox" value="landscape" class="ratio"
                                        id="searchbar-ratio-landscape" v-model='ratios'>
                                    <label for="searchbar-ratio-landscape">All Wide</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="portrait" class="ratio" id="searchbar-ratio-portrait"
                                        v-model='ratios'>
                                    <label for="searchbar-ratio-portrait">All Portrait</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" value="16x9" class="ratio" id="searchbar-ratio-16x9"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-16x9">16 × 9</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="21x9" class="ratio" id="searchbar-ratio-21x9"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-21x9">21 × 9</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="9x16" class="ratio" id="searchbar-ratio-9x16"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-9x16">9 × 16</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="1x1" class="ratio" id="searchbar-ratio-1x1"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-1x1">1 × 1</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" value="16x10" class="ratio" id="searchbar-ratio-16x10"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-16x10">16 × 10</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="32x9" class="ratio" id="searchbar-ratio-32x9"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-32x9">32 × 9</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="10x16" class="ratio" id="searchbar-ratio-10x16"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-10x16">10 × 16</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="3x2" class="ratio" id="searchbar-ratio-3x2"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-3x2">3 × 2</label>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="checkbox" value="48x9" class="ratio" id="searchbar-ratio-48x9"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-48x9">48 × 9</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="9x18" class="ratio" id="searchbar-ratio-9x18"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-9x18">9 × 18</label>
                                </td>
                                <td>
                                    <input type="checkbox" value="4x3" class="ratio" id="searchbar-ratio-4x3"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-4x3">4 × 3</label>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <input type="checkbox" value="5x4" class="ratio" id="searchbar-ratio-5x4"
                                        v-model="ratios">
                                    <label for="searchbar-ratio-5x4">5 × 4</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button class="button-refresh" @click="clickRefresh">
                <el-icon>
                    <Refresh />
                </el-icon>
            </button>
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { Search, CloseBold, Operation, Top, Bottom, Refresh } from '@element-plus/icons-vue'
import { ref, computed, onMounted } from 'vue';
import type { SearchParameter } from '@renderer/request/SearchParameter';
import { searchParamStore } from '@renderer/stores'

const store = searchParamStore()

const windowSize = ref<number[]>([0, 0])

const searchText = ref<string>('')

const showDrawer = ref(false)

// date_added*, relevance, random, views, favorites, toplist
const sorting = ref<string>('date_added')
const categoriesArray = ['general', 'anime', 'people']
const categoriesSelected = ref<string[]>(categoriesArray)
const purityArray = ['sfw', 'sketchy', 'nsfw']
const puritySelected = ref<string[]>(purityArray.slice(0, 1))

const order = ref<string[]>(['desc'])
// 分辨率的筛选状态
const limit = ref<string>('atleast')

const atleast = ref<string>('')
const resolutions = ref<string[]>([])
// landscape,portrait,16x9,21x9,9x16,1x1,16x10,32x9,10x16,3x2,48x9,9x18,4x3,5x4
const ratios = ref<string[]>([])

const isAtLast = computed((): boolean => {
    return limit.value === 'atleast'
})
const isDesc = computed((): boolean => {
    return order.value.includes('desc')
})

// 100*/110/111/etc (sfw/sketchy/nsfw)
const purity = computed((): string => {
    let checked = ''
    purityArray.forEach((value) => {
        checked = checked + (puritySelected.value.includes(value) ? 1 : 0)
    });
    return checked
})
// 100/101/111*/etc (general/anime/people)
const categories = computed((): string => {
    let checked = ''
    categoriesArray.forEach((value) => {
        checked = checked + (categoriesSelected.value.includes(value) ? 1 : 0)
    });
    return checked
})

const clickOperation = function () {
    showDrawer.value = !showDrawer.value
}

const clickRefresh = function () {
    sorting.value = 'date_added'
    categoriesSelected.value = categoriesArray
    puritySelected.value = purityArray.slice(0, 1)
    order.value = ['desc']
    limit.value = 'atleast'
    atleast.value = ''
    resolutions.value = []
    ratios.value = []
    clickSearch()
    setTimeout(clickOperation, 1000)
}

const clickSearch = function () {
    const query: SearchParameter = {
        categories: categories.value,
        purity: purity.value,
        sorting: sorting.value,
        order: order.value.includes('desc') ? 'desc' : 'asc'
    }
    if (searchText.value !== '') {
        query.q = searchText.value
    }
    if (sorting.value === 'random') {
        query.seed = Math.random().toString(36).slice(-6);
    }
    if (limit.value === 'atleast') {
        if (atleast.value) {
            query.atleast = atleast.value
        }
    } else if (limit.value === 'exactly') {
        if (resolutions.value.length > 0) {
            query.resolutions = resolutions.value.join(',')
        }
    }
    if (ratios.value.length > 0) {
        query.ratios = ratios.value.join(',')
    }
    store.searchParam = query
}

onMounted(() => {
    windowSize.value = [window.screen.width, window.screen.height]
})
</script>
<style lang="less" scoped>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: center;
}

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

.operation-btn-wrapper {
    height: 80%;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .operation-btn {
        height: 100%;
        font-size: 24px;

        &:hover {
            background-color: var(--navbar-btn-hover-color);
            border-radius: 3px;
        }
    }

}
</style>
<style lang="less">
.search-drawer {
    background-color: var(--search-bar-drawer-bg-color);
    // background-image: linear-gradient(to bottom, #292c2f 0, rgba(34, 34, 34, .5) 100%);

    .framed {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        padding: 3px;
        margin: 0.33em 0;
        height: auto;
        white-space: nowrap;
        border-radius: 3px;
        background-color: rgba(30, 30, 30, .5);
        box-shadow: inset 1px 1px 1px rgb(0 0 0 / 40%), 1px 1px 0 rgb(127 127 127 / 10%);
    }

    .framed label:not(:last-of-type) {
        margin-right: 3px;
    }

    input[type=checkbox],
    input[type=radio] {
        white-space: nowrap;
        margin: 0;
        padding: 0;
        border-width: 0;
        outline: 0 none;
        border-style: solid;
        border-color: inherit;
        font-size: 0.8em;
        line-height: 1.3em;
        vertical-align: baseline;
        font-family: inherit;
        text-decoration: none;
        font-style: normal;
        text-overflow: ellipsis;
        color: inherit;
        box-sizing: border-box;
        visibility: hidden;
        position: fixed;
        width: 0;
        height: 0;
    }

    input[type=checkbox]+label,
    input[type=radio]+label {
        white-space: nowrap;
        margin: 0;
        border-width: 0;
        outline: 0 none;
        border-style: solid;
        border-color: inherit;
        font-size: 0.8em;
        line-height: 1.3em;
        vertical-align: baseline;
        font-family: inherit;
        text-decoration: none;
        font-style: normal;
        text-overflow: ellipsis;
        box-sizing: border-box;
        flex-grow: 1;
        flex-basis: 0;
        user-select: none;
        box-shadow: inset 0 0 .75em rgba(255, 255, 255, .03), 0 2px 0 #222, 0 3px 4px -3px #000, 0 1px 2px rgba(0, 0, 0, .2);
        display: inline-block;
        padding: .5em;
        min-width: 5em;
        text-align: center;
        cursor: pointer;
        color: #aaa;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, .75);
        background-color: #353535;
        background-image: linear-gradient(to bottom, #404040 0, #292929 100%);
        border-radius: 2px;
        transition-property: color, background, text-shadow, box-shadow;
        transition-duration: .25s;
    }

    input[type=checkbox]:checked+label,
    input[type=radio]:checked+label {
        color: #fff;
        background-color: #5e5e5e;
        background-image: linear-gradient(to bottom, #777 0, #444 100%);
    }

    input:checked+label.purity {
        color: #9f9;
        background-color: #474;
        background-image: linear-gradient(to bottom, #595 0, #353 100%);
    }

    hr {
        margin: 0.5em 0;
        border-width: 1px 0 0;
    }

    .respicker-wrapper {
        width: 100%;
        display: inline-block;
        overflow: hidden;
    }

    .respicker p {
        text-align: center;
        font-size: 0.8em;
    }

    .respicker table {
        width: 100%;
        margin: 0.5em 0;
        text-align: center;
        border-collapse: collapse;
        border-spacing: 0;
    }

    table thead {
        border-bottom: 1px solid rgba(127, 127, 127, .5);
    }

    .label-table td,
    .label-table th {
        padding: 2px;
    }

    .label-table th {
        font-size: 0.8em !important;
    }

    .label-table td label {
        font-size: 0.5em !important;
        width: 100%;
        line-height: 2em;
    }

    // .roportion-wrapper .label-table td label {
    //     font-size: 0.8em !important;
    // }

    #search-sorting-checks {
        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-row-gap: 3px;

        label {
            margin-right: 3px;
        }

        label:nth-child(8),
        label:nth-child(16) {
            margin-right: 0;
        }
    }

    .button-refresh {
        width: 100%;
        border-width: 0;
        font-size: 1.1em;
        box-sizing: border-box;
        height: 2.3em;
        text-align: center;
        cursor: pointer;
        color: #ddd;
        text-shadow: -1px -1px 0 #000;
        border-radius: 3px;
        background-color: #204650;
        background-image: linear-gradient(to bottom, #275660 0, #183640 100%);
        background-size: 100% 150%;
        background-position: 0 100%;
        display: inline-block;
        vertical-align: middle;

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(-360deg);
            }
        }

        &:hover i {
            animation: spin 1s ease-in-out infinite;
        }
    }
}
</style>