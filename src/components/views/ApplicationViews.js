import { Outlet, Route, Routes } from "react-router"
import { CaseList } from "../cases/CaseList.js"
import { CaseSearch } from "../cases/CaseSearch.js"
import { CreateCaseForm } from "../cases/CreateCaseForm.js"
import CaseTrackerLogo from "../auth/casetracker-5000-7-30-2023 (1).png"
import { CaseContainer } from "../cases/CaseContainer.js"
import "./ApplicationViews.css"
import { ManagerViews } from "./ManagerViews.js"
import { AdjusterViews } from "./AdjusterViews.js"


export const ApplicationViews = () => {

	const localCaseUser = localStorage.getItem("case_user") //this gets the user object from localStorage. Which user object? The user that is logged in. That user object is stored in localCaseUser variable on this code. I am setting it globally on this function so I can access it in my return statement further down in this function. //"Hey browser, note which user is logged in by looking at the case_user info and giving me the logged-in user's "id" and their "manger" boolean value of true or false
	const caseUserObject = JSON.parse(localCaseUser) // Now we parse the browser-provided data into JS-usable data (an object)
  
		if (caseUserObject.manager) { //*IMPORTANT - we do NOT use isManager for dot notation. Why? because that is on the case object...but we are looking at the user object which only has two properties: "id" and "manager" which is a boolean true or false. So don't make the mistake of coding caseUserObject.isManager as that will not filter properly.
			return <ManagerViews />
		} else {
			return <AdjusterViews />
		}
		
}










//! Below is intentionally removed and commented out since we moved from Adjuster and Manager views to now viewing the application based on who is logged in.
//!The obsolete imports above are because I needed them for a single ApplicationView. Leaving them there if needed later int he event i switch back to a single ApplicationViews module.
// This module basically says, "Hey Browser, here are the only places (url's) where the user can go. So if the user clicks on anything with a url that matches one of my url's below, I will display that url for the user." So if a user is interacting with the list of cases, and clicks on a button there that "navigates" to a url matching one of these below, then this ApplicationViews functino will run and send the user's browser to that url. In short, it "watches the browser URL and displays the correct component". 
// export const ApplicationViews = () => {
// 	return (
// 		<>
// 			<Routes>
// 				<Route path="/" element={
// 					<>
// 						{/* <h1 className="title--main">CaseTracker 5000</h1> */}
// 						<img className="sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />
// 						<div className="subtitle-casetracker5000">Track Daily. Report <span className="title--main--span">Instantly.</span></div>
// 						<br></br>
// 						<Outlet />
// 					</>
// 				}
// 				/>
				
// 				<Route path="/cases" element={
// 					< CaseContainer /> 
// 				} //This routes to the "parent component" which is holding two "child components". Why do this? Because the child components can not communicate or interact with one another 
// 				/>
					
// 				{/* <Route path="resources" element={<Resources />} />
// 					<Route path="contacts" element={<Contacts />} />
// 					<Route path="case1001" element={<case1001 />} /> */}
// 				<Route path="case/create" element={	
// 					<>
// 					<img className="sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />
// 					<div className="subtitle-casetracker5000">Track Daily. Report <span className="title--main--span">Instantly.</span></div>
// 					<CreateCaseForm /> 
// 					</>
// 				} 
// 				/>

// 			</Routes>
// 		</>
// 	)
// }
