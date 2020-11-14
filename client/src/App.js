import React from 'react'
import { Paper, Container, Divider } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles'
import { Header } from './components/Header'
import { BodyContainer } from './components/BodyContainer'
import { StocksContext } from './context/StocksContext'
import { useStocks } from './hooks/stocks.hook'

const useStyle = makeStyles({
  container: {
    height: 600
  },
  paper: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column'
  },
  divider: {
    margin: '15px 50px'
  }
})

function App() {
  const classes = useStyle()
  const { stocksData, fetchedStocks } = useStocks()

  return (
    <StocksContext.Provider value={{ stocksData, fetchedStocks }}>
      <Container className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <Header />
          <Divider className={classes.divider} />
          <BodyContainer />
        </Paper>
      </Container>
    </StocksContext.Provider>
  )
}

export default App