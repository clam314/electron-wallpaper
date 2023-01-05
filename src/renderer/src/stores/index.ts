import { defineStore } from 'pinia'
import type { SearchParameter } from '@renderer/request/SearchParameter'

export const searchParamStore = defineStore('searchParameter', {
    state: () => {
        const searchParam: SearchParameter = {
            categories: '111',
            purity: '100',
            sorting: 'date_added',
            order: 'desc'
        }
        return { searchParam }
    }
})