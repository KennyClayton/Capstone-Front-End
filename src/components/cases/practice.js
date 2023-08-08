const localCaseUser = localStorage.getItem("case_user") //^ this gets the user object from localStorage
  //Which user object? The user that is logged in. That user object is stored in localCaseUser variable on this code. I am setting it globally on this function so I can access it in my return statement further down in this function. //*"Hey browser, note which user is logged in by looking at the case_user info and giving me the logged-in user's "id" and their "manger" boolean value of true or false
  const caseUserObject = JSON.parse(localCaseUser) //* Now we parse the browser-provided data into JS-usable data (an object)

  console.log(caseUserObject)