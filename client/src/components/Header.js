import React, { useContext, useState } from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import { useFetch } from '../hooks/fetch.hook'
import { StocksContext } from '../context/StocksContext'

export const Header = () => {
    const { request } = useFetch()
    const stocksContext = useContext(StocksContext)
    const [value, setValue] = useState('')

    const fetchHandler = async () => {
        const data = await request('/all')
        stocksContext.fetchedStocks(data)
    }

    const searchHandler = async (event) => {
        event.preventDefault()
        const data = await request('/byName', 'POST', {value})
        stocksContext.fetchedStocks(data)
        setValue('')
    }
    
    return (
        <Grid container justify='space-around' alignItems='center' spacing={0}>
            <Grid item xs={12} sm={5}>
                <Button variant='contained' type='submit' fullWidth color='primary' onClick={fetchHandler}>All Stocks</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <form onSubmit={searchHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Find a stock by its name"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </form>
            </Grid>
        </Grid>
    )
}