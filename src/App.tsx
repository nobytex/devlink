import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Admin } from "./pages/admin"
import { Login } from "./pages/login"
import { RedesSociais } from "./pages/redes-sociais"
import { Private } from "./routes/Private"
import { Error404 } from "./pages/error404"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin',
    element: <Private><Admin/></Private>
  },
  {
    path: '/admin/social',
    element: <Private><RedesSociais/></Private>
  },
  {
    path: '*',
    element: <Error404/>
  }

])

export {router};