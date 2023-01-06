import { loadingOverlay, toastContent } from "./appState"



export const showLoading = (bool) => {
    loadingOverlay.visible = bool
}

export const showToast = (string) =>{
    toastContent.text = string
    toastContent.change = !toastContent.change
}