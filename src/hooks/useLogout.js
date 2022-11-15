import useAuthStore from "../context/authStore";

const useLogout = () => {
    const { removeData } = useAuthStore((state) => ({ removeData: state.logout }))

    const logout = () => {
        removeData();
        window.location.href = '/';
    }

    return logout

}

export { useLogout } 