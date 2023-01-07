import { authState, loadingOverlay, toastContent } from "./appState"



export const showLoading = (bool) => {
    loadingOverlay.visible = bool
}
