import { createContext } from 'react'

export const StocksContext = createContext({
    stocksData: null,
    fetchedStocks: () => {}
})