import { createContext, useState } from "react";

const initialState = {
 handleDisplay : () => {}
};
const DisplayContext = createContext(initialState)

const DisplayContextProvider = (props) => {
    const [display,setDisplay] = useState("none");
    const toggleHandleDisplay = () => {
        display === "none" ? setDisplay("Block") : setDisplay("none")
    };
    return (
        <DisplayContext.Provider value={{display,toggleHandleDisplay}}>
            {props.children}
        </DisplayContext.Provider>
    )
}
export {DisplayContext,DisplayContextProvider}