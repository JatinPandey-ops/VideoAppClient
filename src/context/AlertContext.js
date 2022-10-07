import { createContext, useState } from "react";

const initialState = null

const AlertContext = createContext(initialState)

const AlertContextProvider = (props) => {
    const [type,setType] = useState(false)
    const [open,setOpen] = useState(false)
    const [text,setText] = useState("")
    const [details,setDetails] = useState({})
    const [title,setTitle] = useState("")

    return (
        <AlertContext.Provider value={{setType,setOpen,setText,text,type,open,title,setTitle,details,setDetails}}>
            {props.children}
        </AlertContext.Provider>
    )
}
export {AlertContext,AlertContextProvider}