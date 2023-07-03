import {defineStore} from 'pinia'
import {computed, ref} from "vue";

export const useAppStore = defineStore({
    id: 'app',
    state: () => (
        {
            isRouterAlive: true,
            isLoading: false
        } as { isRouterAlive: boolean; isLoading: boolean }
    ),
})

export const useUserStore = defineStore("userInfo",()=>{
    const userId = ref('')

    function setUserId(id:string){
        userId.value = id
    }

    return {
        userId,
        setUserId
    }
})
