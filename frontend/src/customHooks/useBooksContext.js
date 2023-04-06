import {useContext} from 'react';
import { BookContext } from '../contexts/BookContext';

export const UseBookContext = ()=>{
    const context = useContext(BookContext);

    if(!context){
        throw Error("You are not in the scope of this context so you can't use it")
    }

    return context;
}
