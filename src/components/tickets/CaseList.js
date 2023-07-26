import { useEffect, useState } from "react";
import "./Cases.css"

export const CaseList = () => {
  const [cases, setCases] = useState([]);
  //^ Create my database of cases so I can have some for display as I build the app
  
  useEffect(
    () => {
      console.log("Initial state of cases", cases)
    },
    []
  )

  return (
    <>
      <h2>List of Cases</h2>
      {/* <article className="cases">
        {cases.map((case) => {
              return <section className="case">
          <header>Case Number: {case.caseNumber}</header>
          <header>Plaintiff Name: {plaintiff.name}</header>
        </section>
            })}
      </article> */}
    </>
  );
};

