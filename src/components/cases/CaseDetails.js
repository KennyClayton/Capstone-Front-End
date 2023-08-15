import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./CaseDetails.css";
import { Link } from "react-router-dom";

export const CaseDetails = () => {
  const { caseId } = useParams();
  console.log(caseId)
  const [caseDetails, setCaseDetails] = useState({}); //!this state of caseDetails should ONLY be used for routing to the proper case based on the case primary key that is used at the end of the url. I learned that I cannot use it for getting all of my case data. Why not? Because the case details page, where the related case data is coming from, is limited in what I placed in that case object. I did not include all of the case properties in the cases displayed on the CaseList page. So to fix that issue, I can create another fetch call to get access to the permanent data. //?But what if that information changes? If I fetch case 1 and try to use that data to display here, what if that data changes in the database? will it update on each individual page? Yes! I think so
  const [eventTypeDetails, setEventTypeDetails] = useState(0); ///eventTypeDetails will hold the id number of whichever case's claimEventType is clicked, per the handleChange function below
  const navigate = useNavigate();

  //the reason I am using a useEffect to fetch this data instead of just a function is because the url will be different each time. So we need to watch that id every time a click happens to see if the id changes to another case id. That is what routes us to the proper case page. 
  useEffect(() => {
    fetch(`http://localhost:8080/cases/${caseId}`)
      .then((res) => res.json())
      .then((selectedCase) => { //selectedCase right now holds the case object selected by the user
        console.log(selectedCase)
        setCaseDetails(selectedCase); //and now we pass that case object to caseDetails
      });
  },
    [caseId]);
  console.log(caseId)
  console.log(caseDetails)

  //! look for a foreign key issue...a non-existing 
  const handleCaseDelete = (caseId) => {
    fetch(`http://localhost:8080/cases/${caseDetails.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/cases");
      })
      .catch(error => {
        console.error("Error deleting case:", error);
      });
    console.log(caseDetails.id)
  };

  const handleEditButtonClick = () => {
    navigate(`/case/${caseId}/edit`);
  };

  const handleGoBackButtonClick = () => {

    navigate(`/cases`); // navigates back to the list of cases for the current user.
    //*another option for navigating back one page is navigate(-1)
  };


  const handleChange = (event) => { //this function is looking at the jsx under Case Details, the second div...this function grabs the claimEvent id of the clicked case
    if (event.target.id === "claimEventType") { //if the clicked id has claimEventType as its id value...
      setEventTypeDetails(parseInt(event.target.value));//...then run setEventTypeDetails function which will replace eventTypeDetails value above with that clicked id (this is replacing the eventTypeDetails variable above with the clicked case id's claimEventType value ... why? so we can use that particular case object property somewhere else in this code by referencing the variable now)
    }
  };

  //! PROBLEM - This CaseDetails function will render the details of an individual case (for Managers and adjusters). But how do we know which exact user is logged in? We have to know which user is logged in so we can display  one view or another. For example, managers should not see a delete button. So we need a ternary statement in our JSX. In order to differentiate, we grabd the Manager attribute from the case_user object in browser memory (NOT the isManager property of the user object) and we start our ternary statement with if the user is a case manager (ie - if (caseUserObject.manager))
  //^ SOLUTION - Use localStorage.getItem to tell the browser to grab the logged-in user's id and any other key-value pair of that object.  

  const localCaseUser = localStorage.getItem("case_user") //^ this gets the user object from localStorage
  //Which user object? The user that is logged in. That user object is stored in localCaseUser variable on this code. I am setting it globally on this function so I can access it in my return statement further down in this function. //*"Hey browser, note which user is logged in by looking at the case_user info and giving me the logged-in user's "id" and their "manger" boolean value of true or false
  const caseUserObject = JSON.parse(localCaseUser) //* Now we parse the browser-provided data into JS-usable data (an object)



  //!PROBLEM: I need a dropdown for claimEventType that will show the two types I have available to the user to choose.
  //^SOLUTION: "To generate the dropdown options dynamically based on the data from the database, you can map through the claimEvent array and create the <option> elements using the type and id properties."
  return <>
    {
      caseUserObject.manager
        ?
        <>
          <div>
            <h2>Case Details</h2>
            <div>Case Number:{caseDetails.caseNumber}</div>
            <div>Claim Event Name: {caseDetails.claimEventName}</div>
            <div>Plaintiff Name: {caseDetails.plaintiffName}</div>
            <div>Claim Number: {caseDetails.claimNumber}</div>
            <div>dateOfLossId: {caseDetails.dateOfLossId}</div>
            <div>attorneyId: {caseDetails.attorneyId}</div>
            <div>policyType: {caseDetails.policyType}</div>
            <div>IntServedWithComplaint: {caseDetails.IntServedWithComplaint}</div>
            <div>RFPServedWithComplaint: {caseDetails.RFPServedWithComplaint}</div>
            <div>RFAServedWithComplaint: {caseDetails.RFAServedWithComplaint}</div>
            <div>dateServed: {caseDetails.dateServed}</div>
            <div>dateRespondedComplaint: {caseDetails.dateRespondedComplaint}</div>
            <div>dateRespondedPlRFP: {caseDetails.dateRespondedPlRFP}</div>
            <div>dateRespondedPlRFA: {caseDetails.dateRespondedPlRFA}</div>
            <div>dateRespPlRoggs: {caseDetails.dateRespPlRoggs}</div>
            <div>dateDepositionPlCompleted: {caseDetails.dateDepositionPlCompleted}</div>
            <div>trialDate: {caseDetails.trialDate}</div>
            <div>reservesSubmitted: {caseDetails.reservesSubmitted}</div>
            <div>conference50Scheduled: {caseDetails.conference50Scheduled}</div>
            <div>conference100Scheduled: {caseDetails.conference100Scheduled}</div>
            <div>trialConfScheduled: {caseDetails.trialConfScheduled}</div>
            <div>notes: {caseDetails.notes}</div>
            <div>dateCaseClosed: {caseDetails.dateCaseClosed}</div>
            <br></br>
          </div>

          <div>
            <button onClick={handleGoBackButtonClick}>
              Back to Cases
            </button>
          </div>
        </>
        :
        <>
          <div className="case_details_list"> 
            <h2>Case Details</h2>
            <div>Case Number:{caseDetails.caseNumber}</div>
            <div>Claim Event Name: {caseDetails.claimEventName}</div>
            <div>Plaintiff Name: {caseDetails.plaintiffName}</div>
            <div>Claim Number: {caseDetails.claimNumber}</div>
            <div>dateOfLossId: {caseDetails.dateOfLossId}</div>
            <div>attorneyId: {caseDetails.attorneyId}</div>
            <div>policyType: {caseDetails.policyType}</div>
            <div>IntServedWithComplaint: {caseDetails.IntServedWithComplaint}</div>
            <div>RFPServedWithComplaint: {caseDetails.RFPServedWithComplaint}</div>
            <div>RFAServedWithComplaint: {caseDetails.RFAServedWithComplaint}</div>
            <div>dateServed: {caseDetails.dateServed}</div>
            <div>dateRespondedComplaint: {caseDetails.dateRespondedComplaint}</div>
            <div>dateRespondedPlRFP: {caseDetails.dateRespondedPlRFP}</div>
            <div>dateRespondedPlRFA: {caseDetails.dateRespondedPlRFA}</div>
            <div>dateRespPlRoggs: {caseDetails.dateRespPlRoggs}</div>
            <div>dateDepositionPlCompleted: {caseDetails.dateDepositionPlCompleted}</div>
            <div>trialDate: {caseDetails.trialDate}</div>
            <div>reservesSubmitted: {caseDetails.reservesSubmitted}</div>
            <div>conference50Scheduled: {caseDetails.conference50Scheduled}</div>
            <div>conference100Scheduled: {caseDetails.conference100Scheduled}</div>
            <div>trialConfScheduled: {caseDetails.trialConfScheduled}</div>
            <div>notes: {caseDetails.notes}</div>
            <div>dateCaseClosed: {caseDetails.dateCaseClosed}</div>
            <br></br>
          </div>

          <div className="case_details_button_container">

            <button onClick={handleEditButtonClick} className="case_details_edit_button">
              Edit Case
            </button>

            <button onClick={handleGoBackButtonClick} className="case_details_back_button">
              Back to My Cases
            </button>
          </div>
          <div>
            <button onClick={handleCaseDelete} className="case_details_delete_button">
              Delete Case
            </button>

          </div>
        </>
    }
  </>
}

