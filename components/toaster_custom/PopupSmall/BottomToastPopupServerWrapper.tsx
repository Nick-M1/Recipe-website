'use client'

import {useState} from "react";
import BottomToastPopup from "./BottomToastPopup";

type Props = {
    isOpen: boolean
    msgText: string
}

export default function BottomToastPopupServerWrapper({ isOpen, msgText }: Props) {
    const [popupOpen, setPopupOpen] = useState(isOpen)
    return <BottomToastPopup open={popupOpen} setOpen={setPopupOpen} msgText={msgText}/>
}