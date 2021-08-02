import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Avatar, Box, Drawer, Hidden, List, Typography, makeStyles, Grid, Theme, Button } from '@material-ui/core';
import NavItem from './NavItem';
import { routeNavi as navConfig, routeLink} from 'src/routes';
import { IStates } from 'src/stores/root.reducer';
// import { AppConfig } from 'src/configs';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

function renderNavItems(propx: any) {
  const { items, ...rest } = propx;
  return (
    <List disablePadding>{items.reduce((acc: any, item: any) => reduceChildRoutes({ acc, item, ...rest }), [])}</List>
  );
}

function reduceChildRoutes(propx: any) {
  const { acc, pathname, item, depth = 0 } = propx;
  const key = item.title + depth;

  if (item.children?.length > 0) {
    // let check = false
    // for(var i=0; i < item.children.length && check === false; i++){
    //   console.log('check', check)
    //   if(check === false){
    //     const open = matchPath(pathname, {
    //       path: item.children[i].url,
    //       exact: false,
    //     });

    //     if(open !== null){
    //       return;
    //     }
    //   }
    // }

    acc.push(
      <NavItem 
        depth={depth} 
        // icon={item.icon} 
        key={key} 
        // info={item.info} 
        open={false} 
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.children,
        })}
      </NavItem>,
    );
  } else {
    acc.push(<NavItem depth={depth} href={item.url} icon={item.icon} key={key} info={item.info} title={item.title} />);
  }

  return acc;
}

const useStyles = makeStyles((theme: Theme) => ({
  mobileDrawer: {
    width: 256,
    padding: 0
  },
  desktopDrawer: {
    border: 0,
    width: 256,
    top: 65,
    height: 'calc(100% - 65px)',
    // boxShadow: '0 0 1px 0 rgba(0,0,0,0.31), 0 5px 8px -2px rgba(0,0,0,0.25)'
    padding: 0
  },
  scrollbar: {
    display: 'flex',
    flexDirection: 'column',
    border: 0,
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    margin: '0 auto 10px'
  },
  menus: {
    flexGrow: 1,
  },
  boxName: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '150px',
  },
  navTop: {
    padding: theme.spacing(2, 2, 1),
    borderBottom: '0.5px solid #d6d8da',
    textAlign: 'center'
  },
  navBottom: {
    // padding: theme.spacing(0, 0, 3, 3),
    display: 'flex',
    flexDirection: 'column-reverse',
    height: 300,
    backgroundImage: 'url("/static/images/bg-navbar.svg")',
  },
  nonPadding: {
    padding: 0,
  },
  buttonField: {
    backgroundColor: '#E8E9E9',
    borderRadius: '50px',
    fontSize: '0.75rem',
    maxWidth: '286px',
    color: '#000000',
    display: 'flex',
    justifyContent: 'flex-start',
    '&.MuiButton-contained': {
      boxShadow: '0 0 0px 0 rgba(0,0,0,0.31), 0 0px 0px 0px rgba(0,0,0,0.25)',
    },
    '&:hover': {
      backgroundColor: '#D5D5D5',
    },
  },
  iconLogout: {
    width: '10px',
    height: '10px',
  },
  boxIconLogout: {
    background: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px',
    marginRight: '5px',
  },
  iconButton: {
    width: '30px',
    height: '30px',
    color: '#4D4D4F',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.MuiIconButton-root:hover': {
      backgroundColor: '#D9D9D9',
    },
  },
  textSearch: {
    backgroundColor: '#F5F6FA',
    borderRadius: '30px',
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: theme.spacing(1),
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
      '& .MuiInputBase-input': {
        fontSize: 'small',
      },
    },
  },
  textPosition: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  logOut:{
    '& .MuiSvgIcon-root':{
      marginRight: '10px'
    }
  }
}));

const BoxUser = (props: any) => {
  const { classes } = props;
  const userInfo = props.userInfo;
  console.log(userInfo)
  return (
    <Box className={classes.navTop}>
          <Avatar alt="User" className={classes.avatar} src={userInfo.avatar?.avatar_url} />
          <Box>
            <Typography color="primary"><strong>{ userInfo.first_name !== undefined ? `${userInfo.first_name}` : `John Doe`}</strong></Typography>
          </Box>
          {/* <Box className={classes.textPosition}>
            <Typography variant="caption">{`${userInfo.positionName}`}</Typography>
          </Box> */}
        {/* <Grid item> */}
          {/* <BoxSearch /> */}
        {/* </Grid> */}
        {/* <Typography variant="subtitle2">{AppConfig.app.name}</Typography> */}
    </Box>
  );
};

const BoxMenus = (propx: any) => {
  const { location, classes } = propx;
  return (
    <Box className={classes.menus}>
      {/* {navConfig.map((config) => ( */}
        <List className={classes.nonPadding} key={'ก้าวท้าใจ'}>
          {renderNavItems({ items: navConfig, pathname: location.pathname })}
        </List>
      {/* ))} */}
    </Box>
  );
};

// const BoxSearch = (propx: any) => {
//   const classes = useStyles();
//   return (
//     <>
//       <TextField
//         // style={{ display: props.display }}
//         // onChange={setValueSearch}
//         fullWidth
//         className={classes.textSearch}
//         size="small"
//         variant="outlined"
//         placeholder="ค้นหาระบบโปรแกรม"
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 className={classes.iconButton}
//                 aria-label="search"
//                 // onClick={() => props.onSearch && props.onSearch(props.edit)}
//               >
//                 <Search style={{ fontSize: 'x-large', fontWeight: 'bold' }} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//     </>
//   );
// };

const BoxMenuLogout = (propx: any) => {
  const { classes } = propx;
  const history = useHistory();
  const onLogout = () => {
    history.push(routeLink.logout);
  };
  return (
    <Box className={classes.logOut}>
      <Button
        color="secondary"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        className={classes.buttonField}
        onClick={onLogout}
      >
        <PowerSettingsNewIcon/>
        {/* {isSubmitting ? <CircularProgress size={25} /> : 'ออกจากระบบ'} */}
        ออกจากระบบ
      </Button>
    </Box>
  );
};

const BoxDocs = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <Box p={2} className={classes.navBottom}>
      <Grid container spacing={2}>
        <Box pl={1}>{/* <img alt="navButton" src="/static/images/doc-button.svg" /> */}</Box>
        <Grid item className={classes.boxName}>
          {/* <Typography variant="caption">Need Help?</Typography>
          <Typography variant="caption">Check our docs</Typography> */}
        </Grid>
        <Grid item md={12}>
          <Box>
            <BoxMenuLogout classes={classes} location={location} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const NavBar = (propx: any) => {
  const { openMobile, onMobileClose } = propx;
  const classes = useStyles();
  const location = useLocation();
  const { userInfo } = useSelector((state: IStates) => state.generalReducer);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, openMobile, onMobileClose]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column" border={0}>
      <PerfectScrollbar className={classes.scrollbar} options={{ suppressScrollX: true }}>
        <BoxUser userInfo={userInfo} classes={classes} />
        <BoxMenus classes={classes} location={location} />
        <BoxDocs />
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{ elevation: 8 }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer anchor="left" PaperProps={{ elevation: 8 }} classes={{ paper: classes.desktopDrawer, }} open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
