import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { useDispatch } from 'react-redux';
import { GeneralAction } from 'src/stores/general/general.action';
import { ActionSaga } from 'src/services/action.saga';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

interface IDashboardLayout {
  children: JSX.Element;
}
function DashboardLayout(props: IDashboardLayout) {
  const { children } = props;
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const refContent = useRef(null);
  const dispatch = useDispatch();

  //refContent().current.scrollTo(0, refStep.current.offsetTop - 140);
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: GeneralAction.GENERAL_LAYOUT_S,
        payload: { refContent: () => refContent },
      }),
    );
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} ref={refContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
