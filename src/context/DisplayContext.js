import { createContext, useState } from "react";

const initialState = {
 handleDisplay : () => {}
};
const DisplayContext = createContext(initialState)

const DisplayContextProvider = (props) => {
    const [display,setDisplay] = useState(false);
    const toggleHandleDisplay = () => {
        display === false ? setDisplay(true) : setDisplay(false)
    };
    return (
        <DisplayContext.Provider value={{display,toggleHandleDisplay}}>
            {props.children}
        </DisplayContext.Provider>
    )
}
export {DisplayContext,DisplayContextProvider}