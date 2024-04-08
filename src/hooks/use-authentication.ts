import {create} from "zustand";

interface LoginStore {
    isLoggedIn: boolean;
    login: (username: string) => void;
    logout: () => void
}

const useAuthentication = create<LoginStore>((set) => ({
    isLoggedIn: localStorage.getItem("currentUser") !== null,
    login: (username: string) => {
        localStorage.setItem("currentUser", JSON.stringify(username));
        set({isLoggedIn: false});
    },
    logout: () => {
        localStorage.removeItem("currentUser");
        set({isLoggedIn: false});
    },
}));

export default useAuthentication;