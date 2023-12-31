import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cases.css"
import "./CreateCaseForm.css"



//! PROBLEM - I need to list all of my cases (objects) that are stored in the database (on json server). 
//^ SOLUTION - Create a function that lists all cases by using react hooks to fetch, capture and update the state of the data (case objects). The function will return JSX of what we want displayed in the browser.

export const CaseList = ({ searchTermState }) => { //initially set the "cases" variable below as an empty array. How? "useState([])". Why? Because we will pull in some data (using a fetch call to our json server) and fill up that empty array into the "cases" variable. Once that fetch occurs, the "cases" variable will hold all of my "case" objects (ie - my list of cases). Furhter down in the code we will update our "cases" variable by calling the "setCases" function inside of a useEffect() hook. More on that later though.
  //*IMPORTANT - we don't want to have the user changing the value of "cases" here below because we need the COMPLETE and ORIGINAL set of cases from our database...a clean copy of all cases...to reference at different times in future code. So that is why we created filteredCases below cases...so we do useEffects on the filteredCases AND we can still reference all the original cases.
  //^STATE 1 BELOW
  const [cases, setCases] = useState([]); // so, again, the "cases" on this line has an initial value of an empty array at the moment...
  //^STATE 2 BELOW
  const [filteredCases, setFilteredCases] = useState([]); // so we do NOT want to modify the array of cases we got from the API (above), but we want to use the data still. We will load up the empty filteredCases variable with the logged-in user's cases ONLY. How? We set up another useEffect below with if/else statement to see if a manager or non-manager logged in...then display that user's cases only.
  //^STATE 3 BELOW
  const [myCases, setMyCases] = useState([])
  //^STATE 4 BELOW
  const [reservesSubmitted, setReservesSubmitted] = useState(false) //this sets the value of reservesSubmitted to "null" initally...
  //^STATE 5 BELOW
  const [closedCasesOnly, setClosedCasesOnly] = useState(null) //I need "closedCasesOnly" to contain closed cases. 
  //^STATE 6 BELOW
  const [selectedAdjusterId, setSelectedAdjusterId] = useState("")
  const [adjusters, setAdjusters] = useState([])

  const navigate = useNavigate()




  //! PROBLEM - This CaseList function will render a list of all cases (for Managers logged in) and adjuster cases (for the logged-in adjuster). But how do we know which exact user is logged in? We have to know which user is logged in so we can display their own cases/data.
  //^ SOLUTION - Use localStorage.getItem to tell the browser to grab the logged-in user's id and any other key-calue pair of that object.  

  const localCaseUser = localStorage.getItem("case_user") //^ this gets the user object from localStorage
  //Which user object? The user that is logged in. That user object is stored in localCaseUser variable on this code. I am setting it globally on this function so I can access it in my return statement further down in this function. //*"Hey browser, note which user is logged in by looking at the case_user info and giving me the logged-in user's "id" and their "manger" boolean value of true or false
  const caseUserObject = JSON.parse(localCaseUser) //* Now we parse the browser-provided data into JS-usable data (an object)
  // console.log(caseUserObject.id)





  //! PROBLEM - We need these two modules CaseSearch (which contains our search bar on the case list) and CaseList (which lists all our cases) to be able to interact with each other. We placed them in a single parent component in CaseCOntainer. But now we need to watch for changes in the search bar and filter our cases to match whatever the user searches
  //^ SOLUTION implement a useEffect to monitor the state of searchTermState. When searchTermState value starts to change (as the user begins typing into the case search bar), what do we want to happen? How do we know when search bar starts being used by the user? this useEffect is watching the search bar when we set the below searchTermState as the dependency array. So once the user starts typing, this useEffect should filter through all of the cases/objects in the cases array and displaying all cases that have matching characters being typed by the user.
  //* IMPORTANT - this searches by plaintiff name in each case. And only for managers. To enable adjusters to search their own cases, need to adjust the code and use another useEffect.
  useEffect(
    () => { //when searchTermState starts to change from user input, we will run this below function that filters through all cases to match user input
      const searchedCases = cases.filter(case1 => {
        return case1.plaintiffName.toLowerCase().startsWith(searchTermState.toLowerCase())
      });
      setFilteredCases(searchedCases) // run the setFilteredCases function and use searchedCases to update the filteredCases variable (which will display cases matching the user's search)
    },
    [searchTermState]
  )



  const getCasesAndAdjusters = () => {
      fetch('http://localhost:8080/cases?_expand=user') // this grabs the case objects (and expanded to include the user objects) from the cases array that is stored on the json server)
        .then(response => response.json()) // this takes the json text and "parses" it back into readable JS objects so it's usable data for me
        .then((caseArray) => { //then we set a parameter to hold the NEW data (ie our case objects)...when does that parameter take an argument? Right now on the next line...
          setCases(caseArray) //...and here is where we feed the caseArray parameter its argument by saying "set these cases (that we fetched 3 lines above) as the new value of our "cases" variable on line 7". 
          // console.log(caseArray)
        })

      fetch(`http://localhost:8080/adjusters?_expand=user`) //we added the adjuster object for each user here
        .then(response => response.json())
        .then((data) => {
          const adjusterArray = data.filter(case1 => !case1.user.isManager); //this gives us an array of adjuster only, no managers
          setAdjusters(adjusterArray)
          // console.log(adjusterArray)
        })
    }


  //! PROBLEM - Current state of my "cases" is an empty array. How do I update it to the array of case objects?
  //^ SOLUTION - implement useEffect hook. Since the "cases" variable above is an empty array right now, and I need it to hold all of my cases, I'll use the useEffect() hook to fetch, parse and set the new state to all the cases for 

  useEffect( //recall that useEffect purpose is to observe state (initial state is being observed when array is empty...then we can target specific state variables and do something every time it changes. How? with another useEffect)
    () => {
      getCasesAndAdjusters()
    },
    []
  )





  useEffect( //this useEffect will watch for changes to the reservesSubmitted variable which is initially set to false. This hook says "if reservesSubmitted is true, then set filteredCases to show ONLY cases with no reserves submitted yet...else, show all cases regardless
    () => {
      if (reservesSubmitted) { //at the bottom of this useEffect we entered two variable to watch: "cases" and "reservesSubmitted" to see if they change...and if reserveStatus changes from true to false, or false to true....either way if there is a change in reserveStatus.
        const reservesSubmittedCases1 = cases.filter(case1 => case1.reservesSubmitted === true) //...then filter through all cases...and then store all cases with a reservesSubmitted value of true into the variable reservesSubmittedCases (so it now holds all cases where the reservesSubmitted property's boolean value is true)
        setFilteredCases(reservesSubmittedCases1) //...and then pass that list of matching cases as an argument for the setFilteredCases function. And what will that function do? It will update the value of "filteredCases" again to ONLY the list of cases where reservesSubmitted value is "true" //*IMPORTANT to note that this update to filteredCases only happens when a user has clicked a button or updated something which triggers this useEffect hook to run
      }
      else {
        const reservesSubmittedCases2 = cases.filter(case1 => case1.reservesSubmitted === false)
        setFilteredCases(reservesSubmittedCases2)
        // else {
        //   const reservesNotSubmittedCases = cases.filter(case1 => case1.reservesSubmitted === false)
        //   setFilteredCases(reservesNotSubmittedCases) //otherwise, if the value of reservesSubmitted is "false", then update the "filteredCases" variable to list all cases
        // }
      }
    },
    [reservesSubmitted]
  )//? For whatever reason, it didn't work on the third useEffect() I tried adding two dependency variables like we have here. I don't know why.




  useEffect(() => {
    const currentUserCases = cases.filter(
      (case1) => case1.userId === caseUserObject.id
    );
    setMyCases(currentUserCases);
  }, []); //I chose not to watch anything in the array at the end. Why? Because I only need this to run when "All My Cases" button is clicked and ONLY then. I don't need to watch for any state to change otherwise. Originally, I placed "myCases" into that field...but that created an infinite loop.




  //! PROBLEM - Currently, any user that logs in can see all of the cases, even if they are not their own cases. We only want the user to see their own cases.
  //^ SOLUTION - implement another useEffect to watch for the state of the user to change. Once it changes to a certain userId, only that user's cases should display.

  useEffect( //this useEffect will watch for changes to the "cases" variable above and for any other changes to that variable.
    () => {
      //! PROBLEM - In our code, we need to reference whoever the current user is, so we can filter by whether they are a manager or not. Use loalStorage.getItem
      const localCaseUser = localStorage.getItem("case_user") //this gets the user object from localStorage. Which user object? The user that is logged in. That user object is stored in localCaseUser variable
      const caseUserObject = JSON.parse(localCaseUser) //this uses the above variable "localCaseUser" (which is holding the currently logged-in user's object) and parses into JSON so JS can use it as an object. Remember, JSON is just simple text and not formatted like JS would need it to be (as an object). So parsing is muy necessito.
      //From ChatGPT: localStorage.getItem(key): This method is used to retrieve the value associated with a specific key from the web browser's local storage. Local storage allows you to store key-value pairs persistently in the user's browser even after the browser is closed.
      //^SOLUTION - we used localStorage.getItem and then specified a "key" of "case-user" to get access to the user object properties, then stored it in "localCaseUser"
      //* IMPORTANT - If the two variables localCaseUser and caseUserObject were stored outside of this useEffect, then VSCode alerts that I have "missing dependencies"


      if (caseUserObject.manager) { //conditional for when a user logs in...if that user is a manager...show all cases...//*IMPORTANT - we do NOT use isManager for dot notation. Why? because that is on the case object...but we are looking at the user object which only has two properties: "id" and "manager" which is a boolean true or false. So don't make the mistake of coding caseUserObject.isManager as that will not filter properly.
        setFilteredCases(cases) // this says to set the state of the filteredCases variable to all cases without filtering anything. Why? Beause for this project a Manager should be able to see all projects listed. //& I will be working on making this work so that when a Manager logs in, they can see a list of their adjusters and the case load (number of cases) displayed beneath. Also will include a link to view all cases for that adjuster on another page. OR I can do like honey-rae's and use a few buttons to toggle the view of cases based on which adjuster the Manager wants to view.
      }
      else {//conditional for when a user logs in...if they are NOT a manager...then that user should only see their own cases...
        const myCases = cases.filter(case1 => case1.userId === caseUserObject.id) //from the logged-in user's perspective here: my cases should be 
        setFilteredCases(myCases) //this will the value of filteredCases to the variable "myCases" above (which filtered through ALL cases and ONLY includes the cases for the user that is logged in.
      }
    },
    [cases]
    // we place "cases" in here to tell this useEffect to watch the "cases" variable on useState above and if a user logs in, their cases are pulled and displayed ONLY
  )


  //Use the selected adjuster's ID to filter the cases and display only the cases for that adjuster:
  useEffect(() => {
    if (selectedAdjusterId) {
      const filteredCasesByAdjuster = cases.filter(
        (case1) => case1.userId === selectedAdjusterId
      );
      setFilteredCases(filteredCasesByAdjuster);
    } else {
      setFilteredCases(cases);
    }
  }, [selectedAdjusterId, cases]);


  // for the onChange below to show all cases matching that adjuster
  const handleFilterCases = (e) => {
    const c = cases.filter((case1) => {
      return case1.userId === parseInt(e.target.value) //returns where ever this condition is true, meaning whenever the userId of a case in the cases array matches the userId of the selected adjuster from the dropdown menu, that case gets added to the array contained in the c variable
    })
    setFilteredCases(c)
  }
  // console.log(filteredCases, "filteredCases")

  // for the onChange below to update the assigned adjuster's userId
  // mapping runs a function on any matching case....and when the user selects an adjuster name, we need to grab the caseId of the current case AND the userId of the current case and compare it to the cases in our case array.
  
//   const handleReassignAdjuster = (newUserId, e) => { //chatGPT: "It takes two arguments: newUserId, which is the ID of the new adjuster being assigned, and e, which is the event object from the <select> element's onChange event."
//     // when the adjuster name is selected from the dropdown, the case's userId should change to the current user's Id
//     const updatedCases = cases.map((case1) => { //this function does two things: 1. it maps over and performs a function for each case that 
//       if (case1.userId === parseInt(e.target.value)) {
//         // Update the case on the server using the PATCH method
//         // return { ...case1, userId: newUserId, }; //...then take that case and create a new case object and update the userId value to the clicked adjuster's userId value...
      
//       // console.log(e.target.value)
//       fetch(`http://localhost:3000/cases/${case1.id}`, { //...then fetch all cases with that case id
//         method: 'PATCH', //...and patch the current userId with the newUserId (which should be the userId of the adjuster that was selected)
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           userId: newUserId,
//         })
//       })
//         .then(response => response.json())
//         .then((json) => console.log(json));
//         return { ...case1, userId: newUserId }; // Update the userId in the case locally
//     }

//     return case1; //otherwise, if the statement above is false, just return the cases untouched
//   });
//     setFilteredCases(updatedCases)
// }


  const handleReassignAdjuster = (e) => {
    const [newUserId, caseId] = e.target.value.split("--") //split returns the two values
    return fetch(`http://localhost:8080/cases/${parseInt(caseId)}`, { //...then fetch all cases with that case id
        method: 'PATCH', //...and patch the current userId with the newUserId (which should be the userId of the adjuster that was selected)
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: parseInt(newUserId),
        })
      })
      .then(() => {getCasesAndAdjusters()},
      window.alert('Reassignment was successful!')
      );
      
  }

  


useEffect( //...while observing closedCasesOnly, if there is any user input that changes the value of closedCasesOnly, 
  () => {
    if (closedCasesOnly) {
      const closedCaseArray = cases.filter(case1 => { //filter through all cases and return cases that match the userId AND where dateCaseClosed is not an empty string
        return case1.userId === caseUserObject.id && case1.dateCaseClosed !== "" //this says return all cases for the current user AND where the dateCaseClosed property does NOT have an empty string (ie - if a date is placed in that value field then it's a closed case....so when we click closed cases button those are the cases that will show)
      })
      setFilteredCases(closedCaseArray) // set the closedCasesOnly variable to show only those cases that are closed
    }
    else {
      const openCaseArray = cases.filter(case1 => {
        return case1.userId === caseUserObject.id && case1.dateCaseClosed === ""
      })
      setFilteredCases(openCaseArray)
    }
  },
  [closedCasesOnly, cases] // we will observe this variable for any changes by the user...

)


const handleGoBackButtonClick = () => {
  navigate(`/cases`); // navigates back to the list of cases for the current user.
  //*another option for navigating back one page is navigate(-1)
};

// const handleButtonClick = () => {
//   if (setReservesSubmitted(true) && ) {
//     setReservesSubmitted("")
//   } else {

//   }
//   ;
//   setFilteredCases(cases); // Assuming 'cases' is the data you want to set for filteredCases
// };

//! PROBLEM - The page isn't showing the list of cases when I click on the case list. I am logged in as an Adjuster, so it should display.
//^ SOLUTION - Even though we have fetched the data and stored it in "cases" variable, we have not rendered it to the DOM (displayed it in the browser) until we return this whole function we are still writing. So, let's return the jsx (html in react). Important to note: we will actually render this data by exporting this whole function to another module later on. 
//Note that curly braces after the initial article tag is actually #interpolation (like we did to insert data inside html), except we don't need the $ before curly braces...and this is jsx, not technically html.
//? I don't know why Steve's worked on honey-rae's "Filtered State DependingOn User Type" when he did NOT update to the map method on filteredTickets instead of just tickets
//? I also don't know why Steve's did not alert him of missing dependencies like mine did when my localCaseUser and caseUserObject were outside of the second useEffect()
//&Stretch goal: for the h2, I would like to interpolate a conditional Manager List of Cases or "Adjuster List of Cases"
return <>
  <h2>List of Cases</h2>





  { //below says if the logged-in user is a manager, then display these two buttons and call the setReservesSubmitted function. The "No Reserves Yet" button displays all cases where the boolean is false (ie, whether reservesSubmitted value is false)...and "Show All Cases" button displays all cases
    caseUserObject.manager
      ?
      <>
        {
          // <select value={selectedAdjusterId} onChange={(e) => setSelectedAdjusterId(e.target.value)}>
          // what does it do setting defaultValue to default? the defaultValue is an ATTRIBUTE. It is used to set a default value for an input element or a component. In this case we are using defaultValue on a select element. When you use defaultValue="default" on an input element (including a select element i think), it means that the initial value of the input will be set to "default" when the component is rendered.
          <select defaultValue="default"
            onChange={handleFilterCases}
          >
            <option value="default">All Adjusters</option> {/*To hide the first named thing on the dropdown (which is the phrase All Adjusters", i can place the word hidden after the word "default"*/}
            {adjusters.map((case1) => ( //for each case, render an option that displays the full name associated with that case
              (<option key={case1.id} value={case1.userId}>
                {case1.user.fullName}
              </option>)
            ))}
          </select>
        }
        {/* <button onClick={() => setReservesSubmitted (false)} >Reserves Incomplete</button> */}
        <button onClick={() => setReservesSubmitted(prevState => !prevState)}>Toggle Reserves</button>
        {/* <button onClick={() => handleButtonClick}>All Reserves</button> */}
        <button onClick={() => setFilteredCases(cases)} >All Adjusters' Cases</button>

        <article className="cases">
          {
            filteredCases.map(
              (case1) => {
                //when the Case Number link (below) is clicked, it is routed by the AdjusterViews module to the CaseDetails page for that specific case.
                return (

                  <section className="case" key={`case--${case1.id}`}>
                    <h4>Case Number: {case1.caseNumber}</h4>
                    <div>Plaintiff Name: {case1.plaintiffName}</div>
                    <div>Claim Number: {case1.claimNumber}</div>
                    <div>Reserves Submitted?{case1.reservesSubmitted ? "✅" : "🚨"}</div>
                    <div>Adjuster: {case1?.user?.fullName}</div>
                    <div>Case Closed? {case1.dateCaseClosed}</div>
                    <br></br>
                    {/* <Link to={`http://localhost:3000/cases/${case1.id}`}>
                        <button>Reassign Case</button></Link> */}
                    <div>
                      <select
                        value={selectedAdjusterId}
                        onChange={handleReassignAdjuster}
                      >
                        <option value="">Reassign Adjuster</option> {/*To hide the first named thing on the dropdown (which is the phrase All Adjusters", i can place the word hidden after the word "default"*/}
                        {adjusters.map((adjuster) => ( //for each case, render an option that displays the full name associated with that case
                          (<option key={`${adjuster.id}`} value={`${adjuster.userId}--${case1.id}`}>
                            {adjuster.user.fullName}
                          </option>)
                        ))}
                      </select>
                    </div>
                    <br></br>
                    <div>
                    <Link to={`http://localhost:3000/cases/${case1.id}`}>
                        <button>View Case Details</button></Link>
                    </div>
                  </section>
                )
              }
            )
          }
        </article>

      </>

      :

      <>
        <button onClick={() => navigate("/case/create")} className="new-case-button">Create New Case</button>
        <br></br>
        <br></br>
        <div>
          <button onClick={() => setClosedCasesOnly(false)}>My Open Cases</button>
          <button onClick={() => setClosedCasesOnly(true)}>My Closed Cases</button>
          {/* <button onClick={() => setMyCases(myCases)}>All My Cases</button> */}
        </div>
        {/* <button onClick={() => navigate("/case/contact")}>Contacts</button>
        <button onClick={() => navigate("/case/resources")}>Resources</button> */}

        <article className="cases">
          {
            filteredCases.map(
              (case1) => {
                //when the Case Number link (below) is clicked, it is routed by the AdjusterViews module to the CaseDetails page for that specific case.
                return (

                  <section className="case" key={`case--${case1.id}`}>
                    <h4>Case Number: {case1.caseNumber}</h4>
                    <div>Plaintiff Name: {case1.plaintiffName}</div>
                    <div>Claim Number: {case1.claimNumber}</div>
                    <div>Reserves Submitted?{case1.reservesSubmitted ? "✅" : "🚨"}</div>
                    <div>Adjuster: {case1?.user?.fullName}</div>
                    <div>Case Closed? {case1.dateCaseClosed}</div>
                    <br></br>
                    <Link to={`http://localhost:3000/cases/${case1.id}`}>
                      <button>Case Details</button></Link>
                  </section>
                )
              }
            )
          }
        </article>



      </>
  }

</>
};

