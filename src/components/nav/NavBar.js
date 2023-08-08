import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import "./NavBar.css"




export const NavBar = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); //why do we set initial state as null instead of arrya or object? because we are not going to set the state to an array or object at any point.

useEffect(() => { //in a single useEffect we are fetching the users from the database AND the current user on the application
    // Fetch users from JSON server
    fetch("http://localhost:8080/users")
        .then(response => response.json())
        .then(data => setUsers(data)) //I've got all the users objects in an array inside of the "users variable"
//^ above we got the array of all users
    const localCaseUser = JSON.parse(localStorage.getItem("case_user")); //caseUser is the userId for whoever is logged into the application
//^ above we got the current user object from the browser/memory. We parsed i

    if (localCaseUser) { //if this is true, then 
        fetch(`http://localhost:8080/users/${localCaseUser.id}`) //fetch from the users array and target the specific id that we got from localStorage. So why did we use localCaseUser.id? We grabbed the current user's id from the broser's memory with localStorage.getItem above. Then we just dot notate the id property and interpolate the userId integer at the end of our url path. That gives us the user object of the current user. Then, two lines down, we set the current user to that user object with the setCurrentUser function from useEffect.
                .then(response => response.json())
                .then(user => setCurrentUser(user))
    }

    

}, [])

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cases">Cases</Link>
            </li>
            {
                localStorage.getItem("case_user") //look at the user in localStorage (hey browser, look at the currently logged in user)...and if it is a case_user... then when that user clicks the "Logout" link, remove that current user's locally-stored object from localStorage (case_user that is stored in local as the current user right now) and then navigate to root directory (the slash)
                    ? (
                        <>
                            <li className="navbar__item navbar__logout">
                                <Link className="navbar__link" to="" onClick={() => {
                                    localStorage.removeItem("case_user")
                                    navigate("/", { replace: true })
                                }}>Logout</Link>
                            </li>
                            <p className="navbar_current_user">You are logged in as: {currentUser && currentUser.fullName}</p>
                        </>

                    ) : ""
            }
        </ul>
    )
}
