import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Logo from '../Images/Logo.png'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        backgroundColor: '#313c3f',
        color: 'white',
        padding: '0.6%',
        boxShadow: '0 1px 10px 2px #676868',
        [theme.breakpoints.down("xs")]: {
            padding: "2%",
        },
    },
    heading: {
        fontWeight:'bold',
        paddingLeft: '1%',
        [theme.breakpoints.down("xs")]: {
            fontSize: '28px',
        },
    },
    image: {
        height: 45,
        width: 50,
        [theme.breakpoints.down("xs")]: {
            height: 35,
            width: 40,
        },
    }
}));

export const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.header}>
            <img src={Logo} className={classes.image} alt="Logo" />
            <Typography variant="h4" className={classes.heading}>Quiz App</Typography>
        </div>
    )
}