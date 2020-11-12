import React, {createContext, useContext, useReducer} from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const reducer = (prevState, action) => {
    const {type, payload:token} = action;

    if(type===SET_TOKEN){
        return(
            {...prevState, jwtToken:token}
        );
    }else if(type===DELETE_TOKEN){
        return(
            {jwtToken:""}
        );
    }else{
        return prevState
    }

};

//Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";
//Set Actions
const setTOken = () => ({type:SET_TOKEN});
const deleteToken = () => ({type:DELETE_TOKEN});

export function AppProvider({children}){
    const [store, dispatch] = useReducer(reducer, {});
    return(
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}