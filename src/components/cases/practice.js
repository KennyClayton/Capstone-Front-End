const localCaseUser = localStorage.getItem("case_user") //^ this gets the user object from localStorage
  //Which user object? The user that is logged in. That user object is stored in localCaseUser variable on this code. I am setting it globally on this function so I can access it in my return statement further down in this function. //*"Hey browser, note which user is logged in by looking at the case_user info and giving me the logged-in user's "id" and their "manger" boolean value of true or false
  const caseUserObject = JSON.parse(localCaseUser) //* Now we parse the browser-provided data into JS-usable data (an object)

  console.log(caseUserObject)





  const handleReassignAdjuster = (newUserId, e) => { //chatGPT: "It takes two arguments: newUserId, which is the ID of the new adjuster being assigned, and e, which is the event object from the <select> element's onChange event."
    // when the adjuster name is selected from the dropdown, the case's userId should change to the current user's Id
    const updatedCases = cases.map((case1) => { //this function does two things: 1. it maps over and performs a function for each case that 
      if (case1.userId === parseInt(e.target.value)) {
        // Update the case on the server using the PATCH method
        // return { ...case1, userId: newUserId, }; //...then take that case and create a new case object and update the userId value to the clicked adjuster's userId value...
      
      console.log(e.target.value)
      fetch(`http://localhost:3000/cases/${case1.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: newUserId,
        })
      })
        .then(response => response.json())
        .then((json) => console.log(json));
        return { ...case1, userId: newUserId }; // Update the userId in the case locally
    }

    return case1; //otherwise, if the statement above is false, just return the cases untouched
  });
    setFilteredCases(updatedCases)
}