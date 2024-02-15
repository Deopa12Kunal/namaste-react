import React from 'react';
import ReactDOM  from 'react-dom/client';
import Header from './component/Header';
import Body from './component/Body';
import About from './component/About';
import Contact from './component/Contact';
import Error from './component/Error';
import RestaurantMenu from './component/RestaurantMenu';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
  const AppLayout =()=>{
    return (
        <div className='app'>
          <Header/>
{/* <Body/> */}
<Outlet/>

        </div>

    );
  };
 const appRouter = createBrowserRouter([
{
  path: "/",
  element: <AppLayout />,
  children:[
    {
      path: "/",
      element: <Body/>,
    },
    {
      path: "/About",
      element: <About/>,
    },
    {
      path: "/Contact",
      element: <Contact/>,
    },
    {
      path: "/restaurants/:resId",
      element: <RestaurantMenu/>,

    },
  ],
  errorElement:<Error />,
},

]);

 const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);