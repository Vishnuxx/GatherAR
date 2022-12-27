import {atom} from 'recoil'

export const showCalibrator = atom({
    key: "showCalibrator",
    default: true
})

export const isHost = atom({
    key: 'isHost',
    default: false
})