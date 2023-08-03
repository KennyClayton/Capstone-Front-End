import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

//trying to learn again how the case object data came into this module. 
    //Tool 1: useParams gives us the case id number by looking at the url when the case is clicked (ie - on the Case List page, the user clicks a case)
        //How to use the tool: insert an object with a property of id and make it equal to the useParams hook. This way, the object's variable "id" catches the case id found in the url
    //Tool 2: 

export const CaseDetails = () => {
    const {id} = useParams()
    const [caseDetails, setCaseDetails] = useState({})
    //const [cases, setCases] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8080/cases/${id}`)
        .then(res => res.json())
        .then((casesArray) => {
            setCaseDetails(casesArray)
        })
    },
    [id]) //?i think this id changed when the user clicked on the link for the individual case, which triggers this useEffet

    // useEffect(() => { //this is the method from Honey-Rae's to fetch all cases 
    //     fetch(`http://localhost:8080/cases`)
    //     .then(res => res.json())
    //     .then((case1Array) => {
    //         setCases(case1Array)
    //     })
    // },
    // []
    // )



    // const deleteButton = () => { //this function will determine whether the "delete" button should appear for the logged-in user. So we need to compare the currently logged-in user Id (the "userAdjuster" variable in the above code) with the userId of the cases being displayed (ie "assignedAdjuster" in the above code).
    //     if (!currentUser.isManager) { //...so if the current user is NOT a Manager...
    //         return <button onClick={() => {//...the onClick should run a function that fetches with a DELETE method
    //             fetch(`http://localhost:8080/cases/${id}`, {
    //                 method: "DELETE" //use the delete method on this fetch call
    //             })
    //                 .then(() => {
    //                     getAllCases() //...then bring back down from json server, all the cases NOW listed after we just deleted one.
    //                 })
    //         }} className="case_close">Delete Case</button> //This canClose function returns the ability for a user to click the "Close Case" button.
    //     } else { //...otherwise ... 
    //         return "" //...if there is a date entered as a value in dateCaseClosed property, then DON'T display this button on the web page...just show an empty string instead.
    //     }
    // }

    const handleCaseDelete = (caseId) => {
        fetch(`http://localhost:8080/cases/${caseId}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(() => {
            navigate("/cases")
        })
    }

    return (
        <div>
            <h1>Case Details</h1>
            <p>Case Number: {caseDetails.caseNumber}</p>
            <p>Claim Event Type: {caseDetails.claimEventType}</p>
            <button onClick={() => handleCaseDelete(caseDetails.id)}>
            Delete Case</button>
        </div>
    


    )
}