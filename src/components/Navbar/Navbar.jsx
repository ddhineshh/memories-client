import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import useStyles from './styles'
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const history = useHistory();

    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        history.push('/');

    };

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>

                <Link to='/' className={classes}>
                    <img className={classes.image} src={memoriesText} alt="stories" height="45" />
                    <img className={classes.image} src={memoriesLogo} alt="stories" height="40" />
                </Link>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>

                            <Typography className={classes.username} variant='h6' >
                                {user.result.name}
                            </Typography>
                            <Button className={classes.logout} variant='contained' color='secondary' onClick={logout} >Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary' className={classes.login}>Login</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar