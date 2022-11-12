import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';

const authStore = (set) => ({
    token: null,
    user: null,
    setToken: (token) => set((state) => ({ token: token })),
    setUser: (user) => set((state) => ({ user: user })),
    logout: () => set({user: null, token: null})
})

const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: 'auth'
        })
    )
)

export default useAuthStore;