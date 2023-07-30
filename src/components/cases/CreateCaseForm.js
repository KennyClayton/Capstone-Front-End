import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const CreateCaseForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [case1, update] = useState({ //* IMPORTANT: THE UPDATE FUNCTION TO THE LEFT WILL UPDATE CASE1 VARIABLE WITH THE DATA WE PROVIDE BELOW, EXCEPT THE USER'S SELECTIONS REPLACE THE VALUES. So we are giving it the SAME keys in our case objects and the values will be determined by the user.
        //* When will the update funciton run though and update case1 with the user's info? When the user clicks on the input fields and starts typing or clicking, per the "return"  portion of this whole CreateCaseForm function
        caseNumber: "",
        reservesSubmitted: "",
        IntServedWithComplaint: "",
        RFPServedWithComplaint: "",
        RFAServedWithComplaint: "",
        notes: ""

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
        <form className="CreateCaseForm">
            
            <h2 className="CreateCaseForm__title">Create A New Case</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Case Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Ex: 1234"
                        value={case1.caseNumber}
                        onChange={ //this says "OK browser, on change (click, typing or whatever) of the "Case Number" input field..."
                            (evt) => { //..."whatever event occurs - whether a click or character is typed, etc..."
                                const copy = { ...case1 } //..."create a copy of the case using the spread operator {...object} and store a copy of that case object in the "copy" variable...
                                copy.caseNumber = evt.target.value //...then, whatever data the user is putting into the "Case Number" input field (ie - the event target's value) will replace the "caseNumber" value in that particular case object...
                                update(copy) //...and finally this will send "copy" (which is now the user's input text) as the new state of the case1 variable above. How? With the useState update funciton that gives new data (which is the "copy" variable right here) to the "case1" variable in the above useState. 
                            }
                        } />
                    <label htmlFor="description">Notes:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Additional notes..."
                        value={case1.notes}
                        onChange={
                            (evt) => {
                                const copy = { ...case1 } //..."create a copy of the case and store a copy of that case object in the "copy" variable...
                                copy.notes = evt.target.value //...then, replace the "notes" value with the info (text) provided by the user typing in the "Notes" input field.
                                update(copy) //...then, run the update function from useState above and replace the data in "case1" variable with the "copy" data here.
                            }
                        } />
                    <label htmlFor="name">Reserves Submitted?</label>
                    <input
                        type="checkbox"
                        value={case1.reservesSubmitted}
                        onChange={
                            (evt) => {
                                const copy = { ...case1 } //..."create a copy of the case and store a copy of that case object in the "copy" variable...
                                copy.reservesSubmitted = evt.target.checked //...then, update the "reservesSubmitted" boolean value to true if the user clicks the checkbox.
                                update(copy) //...then update the "case1" variable above to this "copy" version, which will contain a reservesSubmitted value of "true" if the box was checked by the user.
                            }
                        } />
                </div>
            <h3 className="CreateCaseForm__title">Discovery with Complaint?</h3>
                <div className="form-group">
                    <label htmlFor="name">Interrogatories</label>
                    <input
                        type="checkbox"
                        value={case1.IntServedWithComplaint}
                        onChange={
                            (evt) => {
                                const copy = { ...case1 } //..."create a copy of the case and store a copy of that case object in the "copy" variable...
                                copy.IntServedWithComplaint = evt.target.checked //...then, update the "reservesSubmitted" boolean value to true if the user clicks the checkbox.
                                update(copy) //...then update the "case1" variable above to this "copy" version, which will contain a reservesSubmitted value of "true" if the box was checked by the user.
                            }
                        } 
                        /> <br></br>


                    <label htmlFor="name">RFP</label>
                    <input
                        type="checkbox"
                        value={case1.RFAServedWithComplaint}
                        onChange={
                            (evt) => {
                                const copy = { ...case1 } //..."create a copy of the case and store a copy of that case object in the "copy" variable...
                                copy.RFAServedWithComplaint = evt.target.checked //...then, update the "reservesSubmitted" boolean value to true if the user clicks the checkbox.
                                update(copy) //...then update the "case1" variable above to this "copy" version, which will contain a reservesSubmitted value of "true" if the box was checked by the user.
                            }
                        }
                    /> <br></br>


                    <label htmlFor="name">RFA</label>
                    <input
                        type="checkbox"
                        value={case1.RFPServedWithComplaint}
                        onChange={
                            (evt) => {
                                const copy = { ...case1 } //..."create a copy of the case and store a copy of that case object in the "copy" variable...
                                copy.RFPServedWithComplaint = evt.target.checked //...then, update the "reservesSubmitted" boolean value to true if the user clicks the checkbox.
                                update(copy) //...then update the "case1" variable above to this "copy" version, which will contain a reservesSubmitted value of "true" if the box was checked by the user.
                            }
                        }
                    /> <br></br>
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                </div>
                {/* this is a sample of how I think I'd code if I was doing an update on an existing case page. Basically it includes the interpolation to show whether roggs, RFP, RFA were filed...which would be based on what the initial input was when the user created the case here in CreateCaseForm. SO I may need anothe rmodule called UpdateCase.js to handle all updates? <div className="form-group">This Case was filed with...
                    <label htmlFor="name">Interrogatories</label>
                    <input 
                        type="checkbox"
                        value={case1.reservesSubmitted}
                        onChange={} />
                </div> */}
            </fieldset>
            <button className="btn btn-primary">
                Submit New Case
            </button>
        </form>
    )
}