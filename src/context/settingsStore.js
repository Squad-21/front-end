import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';

const settingsStore = (set) => ({
    notificationIsVisible: true,
    toggleNotificationVisibility: (visibility) => set((state) => ({ notificationIsVisible: visibility })),
})

const useSettingsStore = create(
    devtools(
        persist(settingsStore, {
            name: 'settings'
        })
    )
)

export default useSettingsStore;