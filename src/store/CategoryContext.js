import {createContext, useState} from 'react'

export const Category_Context = createContext(null);

function CategoryContext ({children}) {

    const [category, setCategory] = useState();

    return(
        <Category_Context.Provider value={{category, setCategory}}>
            {children}
        </Category_Context.Provider>
    )
}

export default CategoryContext