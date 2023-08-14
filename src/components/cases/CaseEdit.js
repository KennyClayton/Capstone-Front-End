import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CaseEdit = () => {
    const [case1, setCase1] = useState({
        notes: "",
        reservesSubmitted: null,
        dateCaseClosed: ""
    })

    const { id } = useParams()
    const { caseId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8080/cases/${caseId}`) //this retrives case 94 (or whatever case id)
            .then(response => response.json())
            .then((data) => {
                setCase1(data) //this updates "case1" variable with the case object from the database
            })
    }, [caseId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8080/cases/${caseId}`, { //go to API, save the user input for that particular caseId
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(case1)
        })
            .then((response) => response.json())
            .then(() => {
                navigate(`/cases/${caseId}`)
                // window.history.back() //!we want the user to go back to the specific case after the case is updated...is this syntax right?
            })
    }

    const handleCancelButtonClick = (event) => {
        event.preventDefault()

        navigate(-1); // This navigates back to the previous page
    };



    return <form className="caseForm">
        <h2 className="caseForm__title">Case {case1.caseNumber}</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={case1.notes}
                    onChange={
                        (evt) => {
                            const copy = { ...case1 }
                            copy.notes = evt.target.value
                            setCase1(copy)
                        }
                    }>{case1.notes}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="reserves">Reserves Submitted?</label>
                <input type="checkbox"
                    checked={case1.reservesSubmitted}
                    onChange={
                        (evt) => {
                            const copy = { ...case1 }
                            copy.reservesSubmitted = evt.target.checked
                            setCase1(copy)
                        }
                    } />
            </div>

            <div>
                <label htmlFor="name">Case Closed?</label>
                <input
                    type="checkbox"
                    value={case1.dateCaseClosed}
                    onChange={
                        (evt) => {
                            const copy = { ...case1 }
                            copy.dateCaseClosed = evt.target.checked
                            setCase1(copy)
                        }
                    }
                />
                <label htmlFor="description">Case Closed Date</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="mm/dd/yyyy"
                        value={case1.dateCaseClosed}
                        onChange={ 
                            (evt) => { 
                                const copy = { ...case1 } 
                                copy.dateCaseClosed = evt.target.value 
                                setCase1(copy) 
                            }
                        }
                        />
            </div>

        </fieldset>
        <div className="case_edit_buttons">
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Edits
            </button>
            <button
                onClick={handleCancelButtonClick}
                className="btn btn-secondary">
                Cancel
            </button>
        </div>
    </form>
}