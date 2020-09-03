import React, { useState, useEffect } from 'react';
import { FormControl, TextField, NativeSelect, Button } from "@material-ui/core";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import cx from "classnames";
import useWebAnimations, { zoomIn } from "@wellyshen/use-web-animations";
import { fetchCategory, Difficulty } from "../Services/API";
import { UserDataProps, categoryArray } from '../Types/QuizTypes'
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({
    Paper: {
        width: '45%',
        backgroundColor: '#c3d4db',
        padding: '1.5%',
        margin: '0 auto',
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.down("sm")]: {
            width: "70%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "80%",
        },
    },
    Form: {
        display: 'flex',
        flexDirection: 'column',
    },
    FormControl: {
        padding: '2%',
        fontSize: '21px',
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
        },
    },
    Typography: {
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    Heading: {
        paddingTop: '1%',
        [theme.breakpoints.down("xs")]: {
            fontSize: "50px",
        },
    },
    SubHeading: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "38px",
        },
    },
    Loading: {
        fontWeight: 'bold',
    },
    resize: {
        fontSize: '21px',
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
        },
    },
    labelRoot: {
        fontSize: 21,
        fontWeight: 'bold',
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
        },
    },
    labelFocused: {},
    options: {
        fontSize: '21px',
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
        },
    }
}));

const UserData: React.FC<UserDataProps> = ({ setRegistered, setUser }) => {
    const classes = useStyles();
    const { ref: QuizForm } = useWebAnimations({ ...zoomIn });
    const [loading, setLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<any[]>([]);
    const [values, setValues] = useState({
        name: '',
        difficulty: '',
        category: '',
    });
    
    const handleChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (values.name && values.difficulty && values.category) {
            setUser(values)
            setRegistered(true)
        }
        else {
            alert("Please Fill the Complete Form")
        }
    }
    
    useEffect(() => {
        const fetchReq = async () => {
            const fetchedData = await fetchCategory();
            await setCategories(fetchedData);
            setLoading(false);
        };
        fetchReq();
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography ref={QuizForm} className={cx(classes.Typography, classes.Heading)} variant="h2" gutterBottom>
                Welcome To Quiz App
            </Typography>

            {loading ? (<Typography variant='h4' className={classes.Loading}>Loading...</Typography>) :
                <Paper className={classes.Paper} elevation={20} >
                    <Typography variant="h3" className={cx(classes.Typography, classes.SubHeading)} gutterBottom>Quiz Form</Typography>

                    <form className={classes.Form} onSubmit={handleSubmit}>
                        <FormControl className={classes.FormControl}>
                            <TextField id="standard-basic" name="name" onChange={handleChange} margin='normal' label="Enter Your Name"
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.labelRoot,
                                        focused: classes.labelFocused
                                    }
                                }}
                            />
                        </FormControl>

                        <FormControl className={classes.FormControl}>
                            <NativeSelect className={classes.options} name="category" onChange={handleChange}>
                                <option value="">Select a Subject</option>
                                {categories.map((category: categoryArray, i) => (
                                    <option key={i} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>

                        <FormControl className={classes.FormControl}>
                            <NativeSelect className={classes.options} defaultValue="" name="difficulty" onChange={handleChange}>
                                <option value="">Select Difficulty Level</option>
                                <option value={Difficulty.EASY}>Easy</option>
                                <option value={Difficulty.MEDIUM}>Medium</option>
                                <option value={Difficulty.HARD}>Hard</option>
                            </NativeSelect>
                        </FormControl>

                        <Button className={classes.FormControl} onSubmit={handleSubmit} variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Paper>
            }
            <Footer />
        </div>
    )
}

export default UserData;