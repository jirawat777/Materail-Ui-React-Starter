import { Box, Button, Typography, makeStyles, CircularProgress } from '@material-ui/core'
import { AccountCircle, LockOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { Logo } from 'src/components'
import BoxInput from './box-input'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        minHeight: '100%',
        '& form': {
            width: '100%'
        }
    },
    boxLogin: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0px 10px'
    },
    boxLogo: {
        textAlign: 'center',
        marginBottom: '30px',
        '& img': {
            height: '80px',
        },
    },
    boxContainer: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px 30px',
        width: '500px',
        '& .MuiTypography-h1': {
            marginBottom: '30px',
            color: '#ff6f00',
            textAlign: 'center'
        }
    },
    btnLogin: {
        display: 'block',
        borderRadius: '50px',
        height: '58px',
        fontSize: 'larger',
        marginTop: theme.spacing(2),
        color: '#ffffff',
        
    }
}))

const BoxLogin = () => {

    const classes = useStyles()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [values, setValues] = useState<any>()
    const handleChange = (e:any) => {
        
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const onSubmit = (e: any) => {
        console.log(values)
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)

        },2000)
    }
    console.log(values)
    return (
        <Box className={classes.root}>
            <Box className={classes.boxLogin}>
                <Box className={classes.boxContainer}>
                    <Box className={classes.boxLogo}>
                        <Logo/>

                    </Box>
                    <Typography variant="h1" component="h2">Login</Typography>

                    <form onSubmit={onSubmit}>
                        <BoxInput
                            placeholder="username"
                            variant="outlined"
                            icon={<AccountCircle/>}
                            name="username"
                            onChange={handleChange}
                        />
                        <BoxInput
                            placeholder="password"
                            variant="outlined"
                            icon={<LockOutlined/>}
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            type="submit"
                            variant="contained"
                            className={classes.btnLogin}
                            onClick={onSubmit}
                        >
                            {isSubmitting ? <CircularProgress size={25} /> : 'Login'}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default BoxLogin
