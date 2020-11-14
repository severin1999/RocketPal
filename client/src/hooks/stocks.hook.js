import { useState, useCallback, useEffect } from 'react'

export const useStocks = () => {
    const [stocksData, setStocksData] = useState(null)

    const fetchedStocks = useCallback(fStocks => {
        setStocksData(fStocks)

        localStorage.setItem('data', JSON.stringify(fStocks))
    }, [])
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'))
        
        if (data) fetchedStocks(data)
    }, [fetchedStocks])

    return {fetchedStocks, stocksData }
}