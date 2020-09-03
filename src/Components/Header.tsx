import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Logo from '../Images/Logo.png'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        backgroundColor: '#054056',
        color: 'white',
        padding: '0.6%',
        boxShadow: '0 2px 7px 4px #6e8791',
        [theme.breakpoints.down("xs")]: {
            padding: "2%",
        },
    },
    heading: {
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