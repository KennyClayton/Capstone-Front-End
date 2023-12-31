import { Outlet, Route, Routes } from "react-router"
import { CreateCaseForm } from "../cases/CreateCaseForm.js"
import CaseTrackerLogo from "../auth/casetracker-5000-7-30-2023 (1).png"
import "./ApplicationViews.css"
import { CaseContainer } from "../cases/CaseContainer.js"
import { CaseDetails } from "../cases/CaseDetails.js"
import { CaseEdit } from "../cases/CaseEdit.js"

// This module basically says, "Hey Browser, here are the only places (url's) where the user can go. So if the user clicks on anything with a url that matches one of my url's below, I will display that url for the user." So if a user is interacting with the list of cases, and clicks on a button there that "navigates" to a url matching one of these below, then this ApplicationViews functino will run and send the user's browser to that url. In short, it "watches the browser URL and displays the correct component". 
export const AdjusterViews = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={
					<>
						{/* <h1 className="title--main">CaseTracker 5000</h1> */}
						<img className="sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />
						<div className="subtitle-casetracker5000">Track Daily. Report <span className="title--main--span">Instantly.</span></div>
						<br></br>
						<Outlet />
					</>
				}
				/>
				
				<Route path="/cases" element={
					< CaseContainer /> 
				} //This routes to the "parent component" which is holding two "child components". Why do this? Because the child components can not communicate or interact with one another 
				/>
					
				{/* <Route path="resources" element={<Resources />} />
					<Route path="contacts" element={<Contacts />} />
					<Route path="case1001" element={<case1001 />} /> */}
				<Route path="case/create" element={	
					<>
					<img className="sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />
					<div className="subtitle-casetracker5000">Track Daily. Report <span className="title--main--span">Instantly.</span></div>
					<CreateCaseForm /> 
					</>
				} 
				/>
				<Route path="/cases/:caseId" element={	
					<>
					<img className="sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />
					<div className="subtitle-casetracker5000">Track Daily. Report <span className="title--main--span">Instantly.</span></div>
					<CaseDetails />
					</>
				} 
				/>

				<Route path="/case/:caseId/edit" element={	
					<>
					<img className="sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />
					<div className="subtitle-casetracker5000">Track Daily. Report <span className="title--main--span">Instantly.</span></div>
					<CaseEdit />
					</>
				} 
				/>

			</Routes>
		</>
	)
}

