import {proxy} from 'valtio'


export const loadingOverlay = proxy({
    visible: false
})

export const toastContent = proxy({
    text: "",
    change:true
})