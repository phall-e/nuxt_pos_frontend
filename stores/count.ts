import { defineStore } from 'pinia'

export const useMyCountStore = defineStore('countStore', () => {
  const count = ref(0);

  const increment = () => {
    count.value++;
  }

  return {
    count,
    increment,
  }
}, { persist: true })
