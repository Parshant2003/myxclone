import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
import Explore from './Explore';
import EditProfile from './EditProfile';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
            children:[
                {
                    path:"/",
                    element:<Feed/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                },
                {
                    path:"/explore",
                    element:<Explore/>
                },
                {
                    path:"/update",
                    element:<EditProfile/>
                }

            ]
        },
        {
            path: "/login",
            element: <Login />
        }
    ])
    return (
        <div className='mt-2'>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body