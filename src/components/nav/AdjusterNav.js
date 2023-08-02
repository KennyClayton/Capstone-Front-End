import { useEffect, useState } from "react"


//^ the goal is to give the logged-in adjuster the ability to edit their profile. Specifically, their IA Firm and team
export const AdjusterProfileForm = () => {
    // TODO: Provide initial state for profile


    // TODO: Get adjuster profile info from API and update state


    const handleSaveButtonClick = () => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }

    return (
        <form className="profile">
            <h2 className="profile__title">Edit Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="iafirm">IA Firm</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.iafirm}
                        onChange={
                            (evt) => {
                                // TODO: Update IA firm property
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Team</label>
                    <input type="number"
                        className="form-control"
                        value={profile.team}
                        onChange={
                            (evt) => {
                                // TODO: Update team property
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}