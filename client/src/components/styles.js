import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles({
    container: {
        padding: '0 50px',
        flex: '1 1 auto'
    },
    grid: {
        height: '100%'
    },
    price: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: 350
    },
    form: {
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 350
    },
    tBody: {
        maxHeight: 301,
        overflowY: 'scroll'
    }
})