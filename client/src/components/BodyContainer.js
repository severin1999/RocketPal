import React, { useState, useContext } from 'react'
import { useFetch } from '../hooks/fetch.hook'
import { StocksContext } from '../context/StocksContext'
import { Container, Grid, TextField, Box, Paper, Typography, Button, FormControlLabel, Switch } from '@material-ui/core'
import { StocksTable } from './StocksTable'
import { useStyle } from './styles'


export const BodyContainer = () => {
    const classes = useStyle()
    const { request } = useFetch()
    const stocksContext = useContext(StocksContext)

    const [addStock, setAddStock] = useState({
        stockName: '', stockPrice: 1
    })
    const [descending, setDescending] = useState(false)
    const [minPrice, setMinPrice] = useState(1)
    
    const handleChange = event => {
        setAddStock({ ...addStock, [event.target.name]: event.target.value });
    }

    const submitHandler = async () => {
        const data = await request('/add', 'POST', {...addStock})
        stocksContext.fetchedStocks(data)
    }

    const byPriceHandler = async () => {
        const data = await request('/byPrice', 'POST', {minPrice, descending})
        stocksContext.fetchedStocks(data)
    }

    return (
        <Container className={classes.container}>
            <Grid container justify='space-between' alignItems='center' spacing={2} className={classes.grid}>
                <Grid item className={classes.price} >
                    <Paper elevation={3} >
                        <form className={classes.form} noValidate autoComplete="off">
                            <Typography variant='h4'>Add your stock</Typography>
                            <TextField
                                label="Name of the stock"
                                variant="outlined"
                                color="secondary"
                                name='stockName'
                                value={addStock.stockName}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Price"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name='stockPrice'
                                value={addStock.stockPrice}
                                onChange={handleChange}
                            />
                            <Button variant="contained" color="primary" size='small' disabled={!addStock.stockName} onClick={submitHandler}>Add</Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item className={classes.tBody}>
                    <StocksTable />
                </Grid>
                <Grid item>
                    <Paper elevation={3} className={classes.form}>
                        <form className={classes.form} noValidate autoComplete="off">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={descending}
                                        onChange={() => setDescending(!descending)}
                                        color="primary"
                                        name='descending'
                                    />
                                }
                                label="Descending"
                            />
                            <Box>
                                <TextField
                                    label="Minimal price for a stock"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={minPrice}
                                    onChange={e => setMinPrice(e.target.value)}
                                />
                            </Box>
                            <Button variant="contained" color="primary" onClick={byPriceHandler}>Get</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
      </Container>
    )
}