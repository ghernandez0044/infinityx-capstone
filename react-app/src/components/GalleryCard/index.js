// Necessary imports
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import './GalleryCard.css'

function GalleryCard({ smallTag, bigTag, buttonText, destination, payload }){

    let choice = ''

    if(destination === 'spacecrafts') choice = 'spacecraft-background'

    if(destination === 'spaceports') choice = 'spaceport-background'

    if(destination === 'planets') choice = 'planet-background'

    if(destination === 'landing') choice = 'landing-page-background'


    // Create history method
    const history = useHistory()

    // Function to handle button click
    const onClick = () => {
        if(destination === 'spacecrafts') history.push(`/spacecrafts/${payload.id}`)

        if(destination === 'spaceports') history.push(`/spaceports/${payload.id}`)

        if(destination === 'planets') history.push(`/planets/${payload.id}`)
    }


    return (
        <div className={`section-a-container sizing ${choice}`}>
            <div className="section-content">
                <div className="gallery-card-font">{smallTag}</div>
                <div className="gallery-card-font-2">{bigTag}</div>
                <div onClick={onClick} className="button animate">
                    <div className="hover-effect"></div>
                    <span className="button-font">{buttonText}</span>
                </div>
            </div>
        </div>
    )
}

export default GalleryCard