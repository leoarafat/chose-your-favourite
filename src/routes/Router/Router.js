import { createBrowserRouter } from "react-router-dom";
import DrawingDetails from "../../components/pages/Home/DrawingDetails/DrawingDetails";
import Home from "../../components/pages/Home/Home/Home";
import Login from "../../components/pages/Login/Login";
import Register from "../../components/pages/Register/Register";
import ErrorPage from "../../components/pages/shared/ErrorPage/ErrorPage";
import Main from "../../layout/Main/Main";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/drawing/:id",
        element: <DrawingDetails />,
      },
     
    //   {
    //     path: "/category/:id",
    //     loader: ({ params }) =>
    //       fetch(`https://buy-and-sell-server.vercel.app/category/${params.id}`),
    //     element: (
    //       <PrivateRoute>
    //         <Category />
    //       </PrivateRoute>
    //     ),
    //   },
    
    ],
  },
]);
