import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';

const authStore = (set) => ({
    token: null,
    setToken: (token) => set((state) => ({ token: token })),
    removeToken: () => set({token: null})
})

const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: 'auth'
        })
    )
)

export default useAuthStore;