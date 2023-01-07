import {proxy} from 'valtio'


export const loadingOverlay = proxy({
    visible: false
})

export const authState = proxy({
    value: false
})

