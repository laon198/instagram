import React, {createContext, useContext, useReducer} from "react";
import {getLocalStorage, setLocalStorage} from "./utils/useLocalStorage";
import useReducerWithSideEffects, { UpdateWithSideEffect } from 'use-reducer-with-side-effects';


const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const reducer = (prevState, action) => {
    const {type, payload:token} = action;

    if(type===SET_TOKEN){
		const newState = {
			...prevState,
			jwtToken : token,
			isAuthenticated : true,
		};
		
		return UpdateWithSideEffect(newState, (state, dispatch)=>{
			setLocalStorage("jwtToken",token)
		})
    }else if(type===DELETE_TOKEN){
		const newState = {
			jwtToken : "",
			isAuthenticated : false,
		};
		
		return UpdateWithSideEffect(newState, (state, dispatch)=>{
			setLocalStorage("jwtToken","")
		})
		
    }else{
        return prevState
    }

};

//Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";
//Set Actions
export const setToken =  token => ({type:SET_TOKEN, payload:token});
export const deleteToken = () => ({type:DELETE_TOKEN});

export function AppProvider({children}){
	const jwtToken = getLocalStorage("jwtToken","");
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
		jwtToken : jwtToken,
		isAuthenticated : jwtToken.length>0,
	});
    return(
        <AppContext.Provider value={{store, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}