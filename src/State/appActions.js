import { loadingOverlay } from "./appState"



export const showLoading = (bool) => {
    loadingOverlay.visible = bool
}