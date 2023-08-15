import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import CaseTrackerLogo from "./casetracker-5000-7-30-2023.png"

//testing how to branch and merge with main and pushing to github

export const Login = () => {
    const [email, set] = useState("mr.slate@bedrock.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8080/users?email=${email}`) //look in the user object for an email that matches the one entered by the user when they try to log in...
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("case_user", JSON.stringify({
                        id: user.id,
                        manager: user.isManager
                    }))

                    navigate("/cases")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    {/* <h1>Case Management System</h1> */}
                    <img className= "sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link  to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

