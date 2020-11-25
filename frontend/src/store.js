import React, {createContext, useContext, useReducer} from "react";
import {getLocalStorage, setLocalStorage} from "./utils/useLocalStorage";
import useReducerWithSideEffects, { UpdateWithSideEffect } from 'use-reducer-with-side-effects';


const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const reducer = (prevState, action) => {
    const {type, payload} = action;

    if(type===SET_TOKEN){
		const newState = {
			...prevState,
			jwtToken : payload.token,
			isAuthenticated : true,
			username : payload.username,
		};
		
		return UpdateWithSideEffect(newState, (state, dispatch)=>{
			setLocalStorage("jwtToken",payload.token);
			setLocalStorage("username",payload.username);
		})
    }else if(type===DELETE_TOKEN){
		const newState = {
			jwtToken : "",
			isAuthenticated : false,
			username : "",
		};
		
		return UpdateWithSideEffect(newState, (state, dispatch)=>{
			setLocalStorage("jwtToken","");
			setLocalStorage("username","");
		})
		
    }else{
        return prevState
    }

};

//Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";
//Set Actions
export const setToken =  (token, username) => ({
	type:SET_TOKEN,
	payload:{
		token : token,
		username : username,
	}
});
export const deleteToken = () => ({type:DELETE_TOKEN});

export function AppProvider({children}){
	const jwtToken = getLocalStorage("jwtToken","");
	const username = getLocalStorage("username","");
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
		jwtToken : jwtToken,
		isAuthenticated : jwtToken.length>0,
		username : username,
	});
    return(
        <AppContext.Provider value={{store, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}