import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./CaseDetails.css";
import { Link } from "react-router-dom";

export const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState({}); //!this state of caseDetails should ONLY be used for routing to the proper case based on the case primary key that is used at the end of the url. I learned that I cannot use it for getting all of my case data. Why not? Because the case details page, where the related case data is coming from, is limited in what I placed in that case object. I did not include all of the case properties in the cases displayed on the CaseList page. So to fix that issue, I can create another fetch call to get access to the permanent data. //?But what if that information changes? If I fetch case 1 and try to use that data to display here, what if that data changes in the database? will it update on each individual page? Yes! I think so
  const [eventTypeDetails, setEventTypeDetails] = useState(0); ///eventTypeDetails will hold the id number of whichever case's claimEventType is clicked, per the handleChange function below
  const navigate = useNavigate();

  //the reason I am using a useEffect to fetch this data instead of just a function is because the url will be different each time. So we need to watch that id every time a click happens to see if the id changes to another case id. That is what routes us to the proper case page. 
  useEffect(() => {
    fetch(`http://localhost:8080/cases/${caseId}`)
      .then((res) => res.json())
      .then((casesArray) => {
        setCaseDetails(casesArray);
      });
  }, [caseId]);

  

  const handleCaseDelete = (caseId) => {
    fetch(`http://localhost:8080/cases/${caseId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/cases");
      });
  };

  
   // Handle "Edit Case" button click
   const handleEditButtonClick = () => {
    navigate(`/case/${caseId}/edit`); // Replace `/cases/${id}/edit` with the correct path to your CaseEdit.js component
  };


  const handleChange = (event) => { //this function is looking at the jsx under Case Details, the second div...this function grabs the claimEvent id of the clicked case
    if (event.target.id === "claimEventType") { //if the clicked id has claimEventType as its id value...
      setEventTypeDetails(parseInt(event.target.value));//...then run setEventTypeDetails function which will replace eventTypeDetails value above with that clicked id (this is replacing the eventTypeDetails variable above with the clicked case id's claimEventType value ... why? so we can use that particular case object property somewhere else in this code by referencing the variable now)
    }
  };
//!PROBLEM: I need a dropdown for claimEventType that will show the two types I have available to the user to choose.
//^SOLUTION: "To generate the dropdown options dynamically based on the data from the database, you can map through the claimEvent array and create the <option> elements using the type and id properties."
  return (
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
        <button onClick={() => handleCaseDelete(caseDetails.id)}>
            Delete Case
        </button>
        
        <button onClick={handleEditButtonClick}>
            Edit Case
        </button>
        </div>

        </>
  );
};
