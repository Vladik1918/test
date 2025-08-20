import { Link } from "react-router-dom"
import { Routes } from "../router/router"

export const Home = () => {
  return (
    <div>
      HOME
      <div className="flex gap-5">
      <Link className="border-2 border-black p-2" to={Routes.LOGIN}>login</Link>
      <Link className="border-2 border-black p-2" to={Routes.REGISTER}>REGISTER</Link>
      <Link className="border-2 border-black p-2" to={Routes.TRIPS}>TRIPS</Link>
      <Link className="border-2 border-black p-2" to={Routes.TRIP_ACCESS}>TRIP_ACCESS</Link>

      </div>
   
    </div>
  )
}
