import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

//~ GOAL OF THIS MODULE - We need to display an individual case when clicked from the CaseList (both managers and adjusters). We also need a "Close Case" button (for adjusters) so they can see their own cases and close any open cases.



//! PROBLEM - we need a function that will display an individual case and some buttons to be added later.
//^ SOLUTION - 

export const Case = ({ caseObject, currentUser, adjusters, getAllCases }) => {
    
    const { id } = useParams(); //! THIS IS EXPERIMENTAL...I WANT TO DISPLAY THIS COMPONENT AT /case34 or whichever case id is clicked on...but not sure how to use params yet.
    //the above supposedly brings in the case id property and stores it in the id variable
    // From chatGPT: "When you use useParams() from React Router, it will extract the dynamic parameters from the URL and return them as an object. In this case, the dynamic parameter is id, and it will extract the id value from the URL and store it in the id variable."
    //So this whole "Case" component will be rendered when the router sends the browser URL to /case123 (or whatever case)....and when does the browser do that? When a user clicks on a link or some kind of onClick target.
    //*Again...a user clicks a link...that click event will do two things: first, it says go to url "localhost..blah blah../case123"  which is when useParams grabs the user's id... and secondly, our code says to render Case.js (as coded in the ApplicationViews module)....and when Case.js is rendered, it sees the useParams and fills in the { id } with the one matching the user who clicked that link.....
    
    
    //find the assigned adjuster for the current case
    let assignedAdjuster = null //Asked chatGPT about this line. " This variable will be used to store information about an adjuster that will be found later in the code."

    if (caseObject.cases.length > 0) { 
        const caseAdjusterRelationship = caseObject.cases[0]
        assignedAdjuster = adjusters.find(adjuster => adjuster.id === caseAdjusterRelationship.userId) //! I had adjusterId before...updated to userId since userId is an actual property of a case that identifies the adjuster
    }
    
    const userAdjuster = adjusters.find(adjuster => adjuster.userId === currentUser.id) // this finds the current user. How? It checks if the userId property of the adjuster object matches the id property of the currentUser object. So we are using the find method on the adjusters array. find method takes a callback function as an argument. From chatGPT: " It's an arrow function that takes an adjuster as an argument and returns a boolean value. The function checks if the userId property of the adjuster object matches the id property of the currentUser object."
    
    
    const canClose = () => { //^this function will determine whether the "Close Case" button should appear for the logged-in user. So we need to compare the currently logged-in user Id (the "userAdjuster" variable in the above code) with the userId of the cases being displayed (ie "assignedAdjuster" in the above code).
        if (userAdjuster?.id === assignedAdjuster?.id && caseObject.dateCaseClosed === "") { //...so if this conditional statement is true, then show this button...the conditional statement reads this way: if the user/adjuster that is currently logged-in (ie - userId: 7) matches the userId of the case's assigned adjuster AND if that case's dateCaseClosed value is an empty string (meaning it does not have a date completed yet, because the case is still open)...THENNNN we can show the "Case Close" button here ... So in short, we want to match each case's uerId to the user/adjuster that is logged in and display the "Close Case" button for that logged-in user's OPEN cases (ie - cases with no date entered into dateCaseClosed value yet). A closed case is one that has a date entered into the dateCaseClosed value...NOT an empty string.
            return <button onClick={closeCase} className="case_close">Close Case</button> //This canClose function returns the ability for a user to click the "Close Case" button.
        } else { //...otherwise ... 
            return "" //...if there is a date entered as a value in dateCaseClosed property, then DON'T display this button on the web page...just show an empty string instead.
        }
    }

//!PROBLEM - An adjuster should be able to delete a case with a "Delete Case" button
//^ SOLUTION - create a deleteButton function with if-else statement so if NOT a manager, then return a delete button...else return an empty string
    const deleteButton = () => { //this function will determine whether the "delete" button should appear for the logged-in user. So we need to compare the currently logged-in user Id (the "userAdjuster" variable in the above code) with the userId of the cases being displayed (ie "assignedAdjuster" in the above code).
        if (!currentUser.isManager) { //...so if the current user is NOT a Manager...
            return <button onClick={() => {//...the onClick should run a function that fetches with a DELETE method
                fetch(`http://localhost:8080/cases/${caseObject.id}`, {
                    method: "DELETE" //use the delete method on this fetch call
                })
                    .then(() => {
                        getAllCases() //...then bring back down from json server, all the cases NOW listed after we just deleted one.
                    })
            }} className="case_close">Delete Case</button> //This canClose function returns the ability for a user to click the "Close Case" button.
        } else { //...otherwise ... 
            return "" //...if there is a date entered as a value in dateCaseClosed property, then DON'T display this button on the web page...just show an empty string instead.
        }
    }



    const closeCase = () => { //^ this function updates the case with a new date completed, which is what closes the case.
        //So it tells the application what to do when the "Close Case" button above is clicked. Which is what? Well, we want the case to be closed...but what does that mean practically in the application? That means that case/object is moved out of the list of cases. So we'll need an onClick, we'll need to oberserve the State of dateCaseCompleted...anything else?
        const copy = { //...we create a copy of the state before we send it to the API (or stringify it)...here we will create a copy as a template
            userId: caseObject.userId,
            caseNumber: caseObject.caseNumber,
            plaintiffName: caseObject.plaintiffName,
            claimNumber: caseObject.claimNumber,
            reservesSubmitted: caseObject.reservesSubmitted,
            Adjuster: caseObject?.user?.fullName,
            dateCaseClosed: new Date()
        }

        return fetch(`http://localhost:8080/cases/${caseObject.id}`, { //...Send (PUT) the new data (updated object) to the JSON server database for permanent storage...but where do we send it with this fetch? to the url for cases, and more specifically, to the MATCHING case ID
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy) //stringify (change from JS code to JSON text) the copy of the case object above so it can be stored on a JSON server.
        })
        .then(response => response.json()) //then parse the response into Javascript-readable cose...
        .then(getAllCases)//...then go get that API state pulled back into the application so the current State gets displayed.
        //* IMPORTANT - If you look at the below buttonOrNotButton, you'll see that the second .then function being passed on .then is written out like an anonymous function. But this isn't necessary. Above, we learned that our second .then can pass the argument without typing out all of the anonymous function code. How? Because JS recognizes what you intend to do which is to simply call a function. It knows you don't need all the extra code. We just pass the getAllCases function directly.
    }

    // const buttonOrNoButton = () => { //! I DON'T THINK I WILL NEED THIS BUTTON - ON THE NSS PROJECT IT ALLOWS A STAFF USER TO CLAIM A TICKET (ie - it POSTS a ticket to the user's ticket array if that user clicks on the "Claim" button. I could use this for an adjuster to claim a case that is not assigned, but that isn't part of the intended functionality of my app.
    //     if (!currentUser.manager) { //if the current user is an adjuster, NOT a manager...
    //         return <button
    //         onClick={() => {
    //             fetch(`http://localhost:8080/cases`, { //! the instructions show employeeTickets instead of cases in their url...make sure cases is appropriate here
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     userId: userAdjuster.id,
    //                     caseNumber: caseObject.caseNumber,
    //                     claimEventType: caseObject.claimEventType,
    //                     claimEventName: caseObject.claimEventName,
    //                     plaintiffName: caseObject.plaintiffName,
    //                     claimNumber: caseObject.claimNumber,
    //                     dateOfLossId: caseObject.dateOfLossId,
    //                     attorneyId: caseObject.attorneyId,
    //                     policyType: caseObject.policyType,
    //                     IntServedWithComplaint: caseObject.IntServedWithComplaint,
    //                     RFPServedWithComplaint: caseObject.RFPServedWithComplaint,
    //                     RFAServedWithComplaint: caseObject.RFAServedWithComplaint,
    //                     dateServed: caseObject.dateServed,
    //                     dateRespondedComplaint: caseObject.dateRespondedComplaint,
    //                     dateRespondedPlRFP: caseObject.dateRespondedPlRFP,
    //                     dateRespondedPlRFA: caseObject.dateRespondedPlRFA,
    //                     dateRespPlRoggs: caseObject.dateRespPlRoggs,
    //                     dateDepositionPlCompleted: caseObject.dateDepositionPlCompleted,
    //                     trialDate: caseObject.trialDate,
    //                     reservesSubmitted: caseObject.reservesSubmitted,
    //                     conference50Scheduled: caseObject.conference50Scheduled,
    //                     conference100Scheduled: caseObject.conference100Scheduled,
    //                     trialConfScheduled: caseObject.trialConfScheduled,
    //                     notes: caseObject.notes,
    //                     dateCaseClosed: caseObject.dateCaseClosed
    //                 })
    //                 })
    //                 .then(response => response.json())
    //                 .then(()=> {
    //                     getAllCases()
    //                 })
    //             }}
    //         >Claim This Case</button>
    //         }
    //         else {
    //             return ""
    //         }
    //     }



//* IMPORTANT - THIS IS THE USER INTERFACE PORTION OF THE CODE
//~ IMPORTANT - THIS IS THE USER INTERFACE PORTION OF THE CODE
//^ IMPORTANT - THIS IS THE USER INTERFACE PORTION OF THE CODE
//& IMPORTANT - THIS IS THE USER INTERFACE PORTION OF THE CODE


        return <section className="case">
            <header className="case_header">
                {
                    !currentUser.manager //if the current user is NOT a manager...(ie they are an adjuster)
                    ? `Case ${caseObject.id}` //then show Case 3 (or whatever id it has) //! do i need to use caseNumber here to show the case number?
                    :<Link to={`/cases/${caseObject.id}/edit`}>Case {caseObject.id}</Link> //otherwise, if a Manager, show a Ticket as a link and send it to the edit page
                }
            </header>
            <section>{caseObject.plaintiffName}</section>
            <section>Reserves Set? {caseObject.reservesSubmitted ? "✅" : "🚨"}</section>
            {/* <footer className="case_footer"> //! I DON'T THINK I NEED THIS FOOTER FOR MY PROJECT
                {
                    caseObject.cases.length
                    ? `Assigned to ${assignedAdjuster !== null ? assignedAdjuster?.users?.fullName : ""}`
                    : buttonOrNoButton()
                }
            </footer>  */}
            {
                canClose()
            }
            {
                deleteButton()
            }

        </section>
}





