// this function performs the case search. But how? This component now has access to the setSearchTerms function on the CaseContainer modulevia the setterFunction property
export const CaseSearch = ({setterFunction}) => {
    return (
        <div>
        <input //this input field will actually run the setterFunction once the user starts typing. Normally the text just stays here, I think. But now, the input field is just looking for a change event, like typing characters in the input field....and when that is detected, the characters are being sent to the PARENT COMPONENT at CaseContainer. How? Again, because the setterFunction is being run as soon as characters start to be typed by the user. The setterFunction will set the "setSearchTerms" value to whatever the user is typing. And then 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Search by Plaintiff Name..." 
        style={{ maxWidth: '450px' }}
        />
        </div>
    )
}