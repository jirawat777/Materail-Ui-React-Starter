import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AppBar, Box, Hidden, IconButton, Toolbar, makeStyles, SvgIcon } from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
// import { THEMES } from 'src/theme';
// import Account from './Account';
// import Contacts from './Contacts';
// import Notifications from './Notifications';
// import Search from './Search';
// import Settings from './Settings';
// import Home from './Home';
import appConfigs from 'src/configs/app.config'
const useStyles = makeStyles((theme: any) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    padding: 0
  },
  toolbar: {
    minHeight: '65px',
  },
  logo: {
    '& a':{
      color: '#fff',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      textDecoration: 'none',
    } ,
    '& > *':{
      display: 'flex'
    },
    '& span': {
      // backgroundColor: '#fff',
      borderRadius: '100%',
      width: '60px',
      height: '60px',
      display: 'flex',
      padding: '8px',
      boxShadow: '0 0 1px 0 rgba(0,0,0,0.31)',
      marginRight: '10px',
      '& img': {
        maxHeight : '55px',
        maxWidth: '100%'
      }
    },
    '& strong':{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: '30px',
      lineHeight:'30px'
    }
  }
}));

const Logo = () => {  
  return (
    <>
      <span><img alt="logo"  src={`${process.env.PUBLIC_URL}/static/logo.png`} /></span>
      <strong>{appConfigs.app.name}</strong>
    </>
  )
};

function TopBar(propx: any) {
  const { className, onMobileNavOpen, ...rest } = propx;
  const classes: any = useStyles();

  return (
    <AppBar elevation={8} className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton className={classes.menuButton} color="inherit" onClick={onMobileNavOpen}>
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Box className={classes.logo}>
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box ml={2} flexGrow={1} />
        {/* <Search /> */}
        {/* <Contacts /> */}
        {/* <Notifications /> */}
        {/* <Settings /> */}

        <Box ml={2}>
          {/* <Home /> */}
          {/* <Notifications /> */}
          {/* <Settings /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
