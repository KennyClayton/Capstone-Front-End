import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CaseForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [case1, update] = useState({

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the case list
    */

    const localCaseUser = localStorage.getItem("case_user")
    const caseUserObject = JSON.parse(localCaseUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API


        // TODO: Perform the fetch() to POST the object to the API
    }
//& Stretch Goal: add a caseNumber array to the database where I house not-yet-used case numbers and then have one assigned as the value of the Case Number input field in the first <div>...i would refer back to the order number we generated in kneel diamonds project. But the database was local on that one....have to figure out how to do it with json serving the database....assuming i would need to fetch. I've commented out the code for it below bc it isn't correct as of 7/23/2023 at 3:12pm
// orderBuilder: {}
// const newCase = {...database.oderBuilder} //where orderBuilder was an empty object within database.js on the kneel diamonds project
// const autoAddCaseNumber = () => {
//     const lastIndex = database.cases.length - 1 // I'm guessing the minus one is to take away this order itself from the tally. so if this order was 256, then we want to only start at 255 when creating our order number below.
//     newCase.id = database.cases[lastIndex].id + 1 // this will create the new order id using the next custom order number in line plus 1
// }

    return (
        <form className="caseForm">
            <h2 className="caseForm__title">Create A New Case</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Case Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Ex: 1234"
                        value={""}
                        onChange={} />
                    <label htmlFor="description">Notes:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Additional notes..."
                        value={case1.notes}
                        onChange={} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Reserves Submitted?</label>
                    <input 
                        type="checkbox"
                        value={case1.reservesSubmitted}
                        onChange={} />
                </div>
            </fieldset>
            <button className="btn btn-primary">
                Submit New Case
            </button>
        </form>
    )
}