import exp from "constants"
import {create} from "zunstand"

export const useAuthStore = create((set) => ({
    authUser: null,

    checkAuth: asynv