import { useState } from "react"
import { CaseSearch } from "./CaseSearch.js"
import { CaseList } from "./CaseList.js"
import CaseTrackerLogo from "../auth/casetracker-5000-7-30-2023 (1).png"


//*IMPORTANT - Where is the prop on this module? setterFunction and searchTermState are the two props.
//Below we have placed the Case Search bar and Case List components into this function. "Props" will pass a value down to a child component (like passing arguments). 
export const CaseContainer = () => {
    const [searchTerms, setSearchTerms] = useState("") //the initial state of searchTerms is an empty string where the user can fill in whatever search terms they want to type.
    return <>
        <img className="sizeDownLogo" src={CaseTrackerLogo} alt="Logo" />        
        <div className="subtitle-casetracker5000">Track Daily. Report <span className="title--main--span">Instantly.</span></div>

        <br></br>
        
        {/* <CaseSearch setterFunction={setSearchTerms} />  */}
        
        <br></br>
        
        <CaseList searchTermState={searchTerms}/>
    </>
}

//setSearchTerms function is received as a prop from the parent CaseContainer component.
// From ChatGPT: CaseContainer uses the CaseSearch component to get user input and updates the searchTerms state based on that input.
// CaseList provides the list of cases to CaseContainer, and CaseContainer passes down the searchTerms value to CaseList as a prop.
// CaseList uses the searchTerms value received from CaseContainer to display any matching cases in the array of cases based on the user's search terms.
// To summarize, CaseContainer acts as an intermediary that manages the state (searchTerms) and coordinates communication between CaseSearch (for getting user input) and CaseList (for displaying filtered cases).