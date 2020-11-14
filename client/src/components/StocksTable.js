import React, { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { StocksContext } from '../context/StocksContext';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 18
    }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow)

const useStyles = makeStyles({
    table: {
      minWidth: 400,
      minHeight: 300
    },
    title: {
        textAlign: 'center'
    }
})

export const StocksTable = () => {
    const classes = useStyles()
    const stocksContext = useContext(StocksContext)
    const stocks = stocksContext.stocksData
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name of stock</StyledTableCell>
                        <StyledTableCell align='right'>Price of stock</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!stocks ? 
                        <StyledTableRow>
                            <Typography className={classes.title} variant='h4' component='td'>Welcome to</Typography> 
                            <Typography className={classes.title} variant='h4' component='th'>Stocks</Typography> 
                        </StyledTableRow>
                    : stocks.map(stock => (
                        <StyledTableRow key={stock.name}>
                            <StyledTableCell component='th' scope='row'>{stock.name}</StyledTableCell>
                            <StyledTableCell align='right'>{stock.price}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}