import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

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
    [id])

    // useEffect(() => {
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