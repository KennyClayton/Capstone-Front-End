// //~ Goal is to have this render an individual case page with details about each case

// import { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom";
// import "./Cases.css"



// export const CaseDetails = ({ caseObject, currentUser, adjusters, getAllCases }) => {
//     const { id } = useParams(); //? how does this grab the id from what url? In AdjusterViews when we are routed to the url, this useParams will catch that case id number. Is that right? And now we can use that case id below
    
//     const [ caseView, setCaseView] = useState (caseObject)
//     const [ adjusters, adjustersArray] = useState([]) //set the initial state of caseView to be the current case (caseObject)

//     //^ grab the individual case id when a single case is clicked
//     useEffect( //?this will get the case object for the case I clicked on?
//         () => {
//             fetch(`http://localhost:8080/cases/${id}`)
//             .then(response => response.json())
//             .then ((caseArray) => {
//                 setCaseView(caseArray)
//             })
//         },
//         [id]
//     )

//     useEffect( //?this will get the case object for the case I clicked on?
//         () => {
//             fetch(`http://localhost:8080/adjusters`)
//             .then(response => response.json())
//             .then ((adjusterArray) => {
//                 setCaseView(adjusterArray)
//             })
//         },
//         []
//     )

//     const userAdjuster = adjusters.find((adjuster) => adjuster.userId === currentUser.id) 
//         setCaseView(userAdjuster)//find the adjuster id matching this case id

//     const canClose = () => { //determine whether the "Close Case" button should appear for the logged-in user. 
//         // if (userAdjuster?.id === assignedAdjuster?.id && caseObject.dateCaseClosed === "") { //So in short, we want to match each case's uerId to the user/adjusterId that is logged in and display the "Close Case" button for that logged-in user's OPEN cases (ie - cases with no date entered into dateCaseClosed value yet). 
//             return <button onClick={closeCase} className="case_close">Close Case</button> //This canClose function returns the ability for a user to click the "Close Case" button.
//         // } else { //...otherwise ... 
//         //     return "" //...if there is a date entered as a value in dateCaseClosed property, then DON'T display this button on the web page...just show an empty string instead.
//         }


//     const deleteButton = () => { //this function will determine whether the "delete" button should appear for the logged-in user. 
//         if (!currentUser.isManager) { //...so if the current user is NOT a Manager...
//             return <button onClick={() => {//...the onClick should run a function that fetches with a DELETE method
//                 fetch(`http://localhost:8080/cases/${caseObject.id}`, {
//                     method: "DELETE" //use the delete method on this fetch call
//                 })
//                     .then(() => {
//                         getAllCases() //...then bring back down from json server, all the cases NOW listed after we just deleted one.
//                     })
//             }} className="case_close">Delete Case</button> 
//         } else { //...otherwise ... 
//             return "" //...if there is a date entered as a value in dateCaseClosed property, then DON'T display this button on the web page...just show an empty string instead.
//         }
//     }



//     const closeCase = () => { //^ this function updates the case with a new date completed, which is what closes the case.
//         //So it tells the application what to do when the "Close Case" button above is clicked...to move the case/object out of the list of cases. 
//         const copy = { //...we create a copy of the state before we send it to the API (or stringify it)...here we will create a copy as a template
//             userId: caseObject.userId,
//             caseNumber: caseObject.caseNumber,
//             plaintiffName: caseObject.plaintiffName,
//             claimNumber: caseObject.claimNumber,
//             reservesSubmitted: caseObject.reservesSubmitted,
//             Adjuster: caseObject?.user?.fullName,
//             dateCaseClosed: new Date()
//         }

//         return fetch(`http://localhost:8080/cases/${caseObject.id}`, { //...Send (PUT) the new data (updated object) to the database
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(copy) //stringify (change from JS code to JSON text) the copy of the case object above so it can be stored on a JSON server.
//         })
//         .then(response => response.json()) //then parse the response into Javascript-readable code...
//         .then(getAllCases)//...then go get that API state pulled back into the application so the current State gets displayed.
//         }
    


//         return <section className="case">
//         <header className="case_header">
//             {
//                 !currentUser.manager //if the current user is NOT a manager...(ie they are an adjuster)
//                 ? `Case ${caseObject.id}` //then show Case 3 (or whatever id it has) //! do i need to use caseNumber here to show the case number?
//                 :<Link to={`/cases/${caseObject.id}/edit`}>Case {caseObject.id}</Link> //otherwise, if a Manager, show a Ticket as a link and send it to the edit page
//             }
//         </header>
//         <section>{caseObject.plaintiffName}</section>
//         <section>Reserves Set? {caseObject.reservesSubmitted ? "✅" : "🚨"}</section>
//         {/* <footer className="case_footer"> //! I DON'T THINK I NEED THIS FOOTER FOR MY PROJECT
//             {
//                 caseObject.cases.length
//                 ? `Assigned to ${assignedAdjuster !== null ? assignedAdjuster?.users?.fullName : ""}`
//                 : buttonOrNoButton()
//             }
//         </footer>  */}
//         {
//             canClose()
//         }
//         {
//             deleteButton()
//         }

//     </section>
// }