import React from 'react';
import ReactDOM  from 'react-dom/client';
import Header from './component/Header';
import Body from './component/Body';
import About from './component/About';
import Contact from './component/Contact';
import Error from './component/Error';
import RestaurantMenu from './component/RestaurantMenu';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { Provider } from 'react-redux';
 import UserContext from './utils/UserContext';
import appStore from './utils/appStore';
import Cart from './component/Cart';
  const AppLayout =()=>{
     const [userName, setUserName]= useState();
     //authentication 
      useEffect(()=>{
         const data ={
          name: "Kunal Deopa",
         }
setUserName(data.name);
      },[]);

    return (
      //TODO:using redux at a paticular section / we have to just wrap the code <Provider>
      <Provider store={appStore}>
       <UserContext.Provider value ={{loggedInUser:userName, setUserName}}>
        <div className='app'>
          <Header/>
<Outlet/>
</div>
</UserContext.Provider>
</Provider>
      

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
    {
      path: "/cart",
      element : <Cart/>,
    },
  ],
  errorElement:<Error />,
},

]);

 const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);