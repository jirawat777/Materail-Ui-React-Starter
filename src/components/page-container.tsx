import React, { useEffect } from 'react';
import { Page, PageHeader } from 'src/components';
import { makeStyles, Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { getCrumbs } from 'src/services/utils';
import { IStates } from 'src/stores/root.reducer';
import { useDispatch, useSelector } from 'react-redux';
// import { MenusAction } from 'src/stores/menus/menus.action';
import { ActionSaga } from 'src/services/action.saga';
import { routeNavi } from 'src/routes';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

interface IPageContainer {
  children?: any;
}
const PageContainer = (props: IPageContainer) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  // const { list, header } = useSelector((state: IStates) => state.menusReducer)
  let location = useLocation();

  // useEffect(() => {
  //   const fetchMenus = async () => {
  //     dispatch(
  //       ActionSaga({
  //           type: MenusAction.MENUS_LIST_R
  //       })
  //     )
  //   }
  //   fetchMenus()
  // },[dispatch])

  // useEffect(() => {
  //   if(list){
  //     const crumbs = getCrumbs(routeNavi, location.pathname);
  //     const pageHeader = crumbs.length > 0 ? crumbs[crumbs.length -1 ].title : "Page Header"
  //     dispatch(
  //       ActionSaga({
  //           type: MenusAction.MENUS_CRUMBS_LIST_S,
  //           payload: crumbs
  //       })
  //     )
  //     dispatch(
  //       ActionSaga({
  //           type: MenusAction.MENUS_HEADER_S,
  //           payload: pageHeader
  //       })
  //     )
  //   }
  // },[dispatch, list, location.pathname])
  
  return (
    <Page className={classes.root}>
      <PageHeader
          // title={header}
      />
      <Container maxWidth="xl">
        {props.children}
      </Container>
    </Page>
  );
};

export default PageContainer;
