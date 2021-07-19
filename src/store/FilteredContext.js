import {createContext, useState} from 'react'

export const Filter_Context = createContext(null);

function FilteredContext({children}) {

    const [filterProducts, setFilterProducts] = useState();

    return (
        <Filter_Context.Provider value={{filterProducts, setFilterProducts}}>
            {children}
        </Filter_Context.Provider>
    )
}

export default FilteredContext
