import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateCaseForm.css"


export const CreateCaseForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
   //^STEP 1: this useState will take the user's input and run the update function here to give the user-input data to the case1 variable...then... 
        //* IMPORTANT: THE UPDATE FUNCTION TO THE LEFT WILL UPDATE CASE1 VARIABLE WITH THE DATA WE PROVIDE BELOW, EXCEPT THE USER'S SELECTIONS REPLACE THE VALUES. So we are giving it the SAME keys in our case objects and the values will be determined by the user.
        //* When will the update function run and update case1 with the user's info? When the user clicks on the input fields and starts typing or clicking, per the "return"  portion of this whole CreateCaseForm function
    const [case1, update] = useState({ 
        caseNumber: "",
        claimEventType: "",
        claimEventName: "",
        plaintiffName: "",
        claimNumber: "",
        dateOfLossId: "",
        attorneyId: "",
        policyType: "",
        IntServedWithComplaint: "",
        RFPServedWithComplaint: "",
        RFAServedWithComplaint: "",
        dateServed: "",
        dateRespondedComplaint: "",
        dateRespondedPlRFP: "",
        dateRespondedPlRFA: "",
        dateRespPlRoggs: "",
        dateDepositionPlCompleted: "",
        trialDate: "",
        reservesSubmitted: "",
        conference50Scheduled: "",
        conference100Scheduled: "",
        trialConfScheduled: "",
        notes: "",
        dateCaseClosed: ""
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect the user to the case list
    */
    const navigate = useNavigate()
    const localCaseUser = localStorage.getItem("case_user") //gets the current user's id
    const caseUserObject = JSON.parse(localCaseUser) // parses and then stores it as JS-usable object

    //^STEP 2: ...then the case1 variable, which now holds the user's completed form data (as outlined in the above object) is used to build another case object to send to the API
    const handleSaveButtonClick = (event) => { //this function will handle the task of sending the user-provided data (which is temp stored in "memory" on the user's computer) and now being held in case1 variable after the user clicked Submit button...that data is now sent to the API for storage. So it needs to know what format or template to use...which we will tell it below (ie - use the case object key-value properties)...
        //* IMPORTANT: Remember that the userId below should have a value of the current logged-in user. That user Id is brought to us by the localStorage.getItem above, which is stored in caseUserobject....so dot notation starts there for the userId. For all other properties we use dot notations from the case1 variable.
        // TODO: Create the object to be saved to the API
        event.preventDefault()
        const caseToSendToAPI = {
            userId: caseUserObject.id,
            caseNumber: case1.caseNumber,
            claimEventType: case1.claimEventType,
            claimEventName: case1.claimEventName,
            plaintiffName: case1.plaintiffName,
            claimNumber: case1.claimNumber,
            dateOfLossId: case1.dateOfLossId,
            attorneyId: case1.attorneyId,
            policyType: case1.policyType,
            IntServedWithComplaint: case1.IntServedWithComplaint,
            RFPServedWithComplaint: case1.RFPServedWithComplaint,
            RFAServedWithComplaint: case1.RFAServedWithComplaint,
            dateServed: case1.dateServed,
            dateRespondedComplaint: case1.dateRespondedComplaint,
            dateRespondedPlRFP: case1.dateRespondedPlRFP,
            dateRespondedPlRFA: case1.dateRespondedPlRFA,
            dateRespPlRoggs: case1.dateRespPlRoggs,
            dateDepositionPlCompleted: case1.dateDepositionPlCompleted,
            trialDate: case1.trialDate,
            reservesSubmitted: case1.reservesSubmitted,
            conference50Scheduled: case1.conference50Scheduled,
            conference100Scheduled: case1.conference100Scheduled,
            trialConfScheduled: case1.trialConfScheduled,
            notes: case1.notes,
            dateCaseClosed: case1.dateCaseClosed
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8080/cases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(caseToSendToAPI)
        })
        .then(response => response.json()) //? So why do we need a response from JSON? We are posting data to the server, not pulling anything down. I think it's because JSON server will "respond with a result", per chatGPT. So, since fetching ALWAYS involves a response from JSON server, it will ALWAYS need to be parsed back into something JS can read.
        .then(() => {
            navigate("/cases")
        })

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
                        placeholder="4-digit number"
                        value={case1.caseNumber}
                        onChange={ //this says "OK browser, on change (click, typing or whatever) of the "Case Number" input field..."
                            (evt) => { //..."whatever event occurs - whether a click or character is typed, etc..."
                                const copy = { ...case1 } //..."create a copy of the case using the spread operator {...object} and store a copy of that case object in the "copy" variable...
                                copy.caseNumber = evt.target.value //...then, whatever data the user is putting into the "Case Number" input field (ie - the event target's value) will replace the "caseNumber" value in that particular case object...
                                update(copy) //...and finally this will send "copy" (which is now the user's input text) as the new state of the case1 variable above. How? With the useState update funciton that gives new data (which is the "copy" variable right here) to the "case1" variable in the above useState. 
                            }
                        } /> <br></br>
                    <label htmlFor="description">Claim Event Name:</label>
                    <select
                        required 
                        autoFocus
                        className="form-control"                        
                        value={case1.claimEventName}
                        onChange={(evt) => {
                                const copy = { ...case1 };
                                copy.claimEventName = evt.target.value;
                                update(copy);
                            }}
                            >
                                <option value="Hurricane Wendy">Hurricane Wendy</option>
                                <option value="Hurricane Destructo">Hurricane Destructo</option>
                    </select>
                    <br></br>


                      
                    <label htmlFor="description">Plaintiff Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="First Name and Last Name"
                        value={case1.plaintiffName}
                        onChange={ 
                            (evt) => { 
                                const copy = { ...case1 } 
                                copy.plaintiffName = evt.target.value 
                                update(copy) 
                            }
                        } /> <br></br>
                    <label htmlFor="description">Claim Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="6-digit number"
                        value={case1.claimNumber}
                        onChange={ 
                            (evt) => { 
                                const copy = { ...case1 } 
                                copy.claimNumber = evt.target.value 
                                update(copy) 
                            }
                        } /> <br></br>

                </div>
                <h3 className="CreateCaseForm__title">Discovery with Complaint?</h3>
                <div className="form-group">
                <br></br>
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


                    <label htmlFor="name">RFA</label>
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


                    <label htmlFor="name">RFP</label>
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
                        } 
                    /> 
                    <br></br>
                    <br></br>
                    <br></br>

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
                        }
                    /> 
                    
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
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} //When the user is finished typing in their input and clicking the check boxes, this Submit button runs the handleSaveButtonClick function above. That function sends the data to the API in our typical case object format.
                className="btn btn-primary">
                Submit New Case
                {/* Important: When we click this button to create a new case, json server will create the primary key on that new object being sent to the json server/database. We will fill out all other key-value properties of the object as a template for JS (ie - the data input fields available to the user)...EXCEPT we don't provide any input for a unique id number/primary key..JSON server does that for us. */}
            </button>
        </form>
    )
}