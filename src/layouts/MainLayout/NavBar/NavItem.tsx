import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, ListItem, makeStyles, Theme, Collapse, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralAction } from 'src/stores/general/general.action';
import { ActionReducer } from 'src/services/action.reducer';
import { IStates } from 'src/stores/root.reducer';
import { getCrumbs } from 'src/services/utils';
import { routeNavi } from 'src/routes';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'unset',
    paddingTop: 0,
    paddingBottom: 0,
    '& span.MuiTouchRipple-root': {
      borderBottom: '0.5px solid #d6d8da',
    },
  },
  itemLeaf: {
    fontSize: '16px',
    lineHeight: '18px',
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    '& span.MuiTouchRipple-root': {
      borderBottom: '0.5px solid #d6d8da',
    },
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    borderRadius: 0,
    padding: '15px',
    textAlign: 'left',
    fontSize: '16px',
    lineHeight: '18px'
  },
  buttonLeaf: {
    fontSize: '16px',
    padding: '15px',
    borderRadius: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    lineHeight: '18px',
    width: '100%',
    '&:hover': {
      color: '#70B642',
    },
  },
  roundedIcon: {
    color: '#70B642',
    backgroundColor: '#ffffff',
    borderRadius: '30px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
  title: {
    marginRight: 'auto',
    textAlign: 'left'
  },
  active: {
    '&.depth-2': {
      '& $title': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  },
  activeLv2: {
    marginRight: 'auto',
  },
  boxActive: {
    width: 5,
    position: 'absolute',
    backgroundColor: '#70B642',
    zIndex: 1,
    bottom: 1,
  },
}));

const NavItem = (propx: any) => {
  const { title, href, depth, children, icon: Icon, className, info: Info, ...rest } = propx;
  // const { header: titleHeader } = useSelector((state: IStates) => state.menusReducer)
  const classes: any = useStyles();
  const [open, setOpen] = useState(!!propx.open);
  const dispatch = useDispatch();
  let location = useLocation();
  const crumbs = getCrumbs(routeNavi, location.pathname);

  const titleHeader = crumbs && crumbs.length > 0 ? crumbs[crumbs.length - 1].title : '';
  const menuTitle = useSelector((state: any) => state.generalReducer.menuTitle);

  const setActive = (titleHeader: any) => {
    dispatch(
      ActionReducer({
        type: GeneralAction.GENERAL_MEUNU_ACTIVE,
        payload: { title: titleHeader },
      }),
    );
  };

  useEffect(() => {
    setActive(titleHeader);
    // eslint-disable-next-line
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen: boolean) => !prevOpen);
  };

  let paddingLeft = 15;
  let backgroundColor = '#fff';

  if (depth > 0) {
    paddingLeft = 15 + 15 * depth;
    backgroundColor = '#f3f2f2';
  }
  if (depth > 1) {
    paddingLeft = 45;
  }

  const style = { paddingLeft, backgroundColor };

  if (children) {
    return (
      <ListItem className={clsx(classes.item, className)} disableGutters key={title} {...rest}>
        <Button className={classes.button} onClick={handleToggle} style={style}>
          {Icon && <Icon className={classes.icon} />}
          <span className={open ? classes.activeLv2 : classes.title}>
            {title}
          </span>
          {open ? (
            <ExpandLessIcon fontSize="small" color="inherit" component="svg" className={classes.roundedIcon} />
          ) : (
            <ExpandMoreIcon fontSize="small" color="inherit" component="svg" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem className={clsx(classes.itemLeaf, className)} disableGutters key={title} {...rest}>
      {menuTitle === title && <Box className={classes.boxActive} key={title}></Box>}
      <Button
        onClick={() => {
          setActive(title);
        }}
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        {Icon && <Icon className={classes.icon} />}
        <span className={classes.title}>
          {title}
        </span>
        {Info && <Info className={classes.info} />}
      </Button>
    </ListItem>
  );
};

export default NavItem;
