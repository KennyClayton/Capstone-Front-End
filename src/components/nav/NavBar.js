import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cases">Cases</Link>
            </li>
            {
                localStorage.getItem("case_user") //look at the user in localStorage (hey browser, look at the currently logged in user)...and if it is a case_user... then when that user clicks the "Logout" link, remove that current user's locally-stored object from localStorage (case_user that is stored in local as the current user right now) and then navigate to root directory (the slash)
                    ? <li className="navbar__item navbar__logout"> 
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("case_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
