import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { loginService } from './services/login.service'



export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => {

         const currentUser = loginService.currentUserValue;
        console.log('private current user',currentUser);
         if (!currentUser) {

        //     // not logged in so redirect to login page with the return url

             return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

        }





        return <Component {...props} />

    }} />

)