import { useEffect, useState } from "react";
import "./Cases.css"

//! PROBLEM - I need to list all of my cases (objects) that are stored in the database (on json server). 
//^ SOLUTION - Create a function that lists all cases by using react hooks to fetch, capture and update the state of the data (case objects). The function will return JSX of what we want displayed in the browser.

export const CaseList = () => { //initially set the "cases" variable below as an empty array. How? "useState([])". Why? Because we will pull in some data (using a fetch call to our json server) and fill up that empty array into the "cases" variable. Once that fetch occurs, the "cases" variable will hold all of my "case" objects (ie - my list of cases). Furhter down in the code we will update our "cases" variable by calling the "setCases" function inside of a useEffect() hook. More on that later though.
  const [cases, setCases] = useState([]); // so, again, the "cases" on this line has an initial value of an empty array at the moment...
  const [filteredCases, setFilteredCases] = useState([]); // so we do NOT want to modify the array of cases we got from the API (above), but we want to use the data still. We will load up the empty filteredCases variable with the logged-in user's cases ONLY. How? We set up another useEffect below with if/else statement to see if a manager or non-manager logged in...then display that user's cases only.

  
  //! PROBLEM - Current state of my "cases" is an empty array. How do I update it to the array of case objects?
  //^ SOLUTION - implement useEffect hook. Since the "cases" variable above is an empty array right now, and I need it to hold all of my cases, I'll use the useEffect() hook to fetch, parse and set the new state
  
  useEffect( //recall that useEffect purpose is to observe state (initial state is being observed when array is empty...then we can target specific state variables and do something every time it changes. How? with another useEffect)
  () => {
    fetch('http://localhost:8080/cases?_expand=user') // this grabs the data from the json server where my case objects are stored
    .then(response => response.json()) // this takes the json text and "parses" it back into readable JS objects so it's usable data for me
    .then((caseArray) => { //then we set a parameter to hold the NEW data (ie our case objects)...when does that parameter take an argument? Right now on the next line...
      setCases(caseArray) //...and here is where we feed the caseArray parameter its argument by saying "set these cases (that we fetched 3 lines above) as the new value of our "cases" variable on line 7". 
    })
  },
  []
  )
  
  //! PROBLEM - Currently, any user that logs in can see all of the cases, even if they are not their own cases. We only want the user to see their own cases.
  //^ SOLUTION - implement another useEffect to watch for the state of the user to change. Once it changes to a certain userId, only that user's cases should display.
  
  useEffect( //this useEffect will watch for changes to the empty array variable "cases" above and for any other changes to that variable.
  () => {
      //! PROBLEM - In our code, we need to reference whoever the current user is, so we can filter by whether they are a manager or not. Use loalStorage.getItem
      //From ChatGPT: localStorage.getItem(key): This method is used to retrieve the value associated with a specific key from the web browser's local storage. Local storage allows you to store key-value pairs persistently in the user's browser even after the browser is closed.
      //^SOLUTION - we used localStorage.getItem and then specified a "key" of "case-user" to get access to the user object properties, then stored it in "localCaseUser"
      //* IMPORTANT - If the two variables localCaseUser and caseUserObject were stored outside of this useEffect, then VSCode alerts that I have "missing dependencies"

      const localCaseUser = localStorage.getItem("case_user") //this gets the user object from localStorage. Which user object? The user that is logged in. That user object is stored in localCaseUser variable
      const caseUserObject = JSON.parse(localCaseUser) //this uses the above variable "localCaseUser" (which is holding the currently logged-in user's object) and parses into JSON so JS can use it as an object. Remember, JSON is just simple text and not formatted like JS would need it to be (as an object). So parsing is muy necessito.
      
      if (caseUserObject.manager) { //conditional for when a user logs in...if that user is a manager...show all cases...//*IMPORTANT - we do NOT use isManager for dot notation. Why? because that is on the case object...btu we are looking at the user object which only has two properties: "id" and "manager" which is a boolean true or false. So don't make the mistake of coding caseUserObject.isManager as that will not filter properly.
        setFilteredCases(cases) // this says to set the state of the filteredCases variable to all cases without filtering anything. Why? Beause for this project a Manager should be able to see all projects listed. //& I will be working on making this work so that when a Manager logs in, they can see a list of their adjusters and the case load (number of cases) displayed beneath. Also will include a link to view all cases for that adjuster on another page. OR I can do like honey-rae's and use a few buttons to toggle the view of cases based on which adjuster the Manager wants to view.
      }
      else {//conditional for when a user logs in...if they are NOT a manager...then that user should only see their own cases...
        const myCases = cases.filter(case1 => case1.userId === caseUserObject.id) //from the logged-in user's perspective here: my cases should be 
        setFilteredCases(myCases) //this will set the value of filteredCases to the variable "myCases" above (which filtered through ALL cases and ONLY includes the cases for the user that is logged in.
      }
    },
    [cases] 
    // we place "cases" in here to tell this useEffect to watch the "cases" variable on useState above and if a user logs in, their cases are pulled and displayed ONLY
  )


  //! PROBLEM - The page isn't showing the list of cases when I click on the case list. I am logged in as an Adjuster, so it should display.
  //^ SOLUTION - Even though we have fetched the data and stored it in "cases" variable, we have not rendered it to the DOM (displayed it in the browser) until we return this whole function we are still writing. So, let's return the jsx (html in react). Important to note: we will actually render this data by exporting this whole function to another module later on. 
    //Note that curly braces after the initial article tag is actually #interpolation (like we did to insert data inside html), except we don't need the $ before curly braces...and this is jsx, not technically html.
//? I don't know why Steve's worked on honey-rae's "Filtered State DependingOn User Type" when he did NOT update to the map method on filteredTickets instead of just tickets
//? I also don't know why Steve's did not alert him of missing dependencies like mine did when my localCaseUser and caseUserObject were outside of the second useEffect()
  return <> 
      <h2>List of Cases</h2>
      
      <article className="cases">
        { 
          filteredCases.map(
            (case1) => {
                return <section className="case">
                  <header>Case Number: {case1.caseNumber}</header>
                  <div>Plaintiff Name: {case1.plaintiffName}</div>
                  <div>Claim Number: {case1.claimNumber}</div>
                  <div>Reserves Submitted?{case1.reservesSubmitted ? "✅" : "🚨" }</div>
                  <div>Adjuster: {case1?.user?.fullName}</div>
                </section>
            }
          )
        }
      </article>
    </>
};

