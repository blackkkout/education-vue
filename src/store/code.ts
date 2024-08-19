import { useLocalStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCodeStore = defineStore('code', () => {
  const code = useLocalStorage(`code`, '')

  function setCode(value: string) {
    code.value = value
  }

  return {
    code,
    setCode
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCodeStore, import.meta.hot))
}
