// Necessary imports
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import './GalleryCard.css'

function GalleryCard({ smallTag, bigTag, buttonText, destination, imageNumber, planetNumber, payload, disable }){

    let choice = ''

    if(destination === 'spacecrafts' && imageNumber === 1) choice = 'spacecraft-background-1'
    if(destination === 'spacecrafts' && imageNumber === 2) choice = 'spacecraft-background-2'
    if(destination === 'spacecrafts' && imageNumber === 3) choice = 'spacecraft-background-3'
    if(destination === 'spacecrafts' && imageNumber === 4) choice = 'spacecraft-background-4'
    if(destination === 'spacecrafts' && imageNumber > 4) choice = 'spacecraft-background-5'

    if(destination === 'spaceports') choice = 'spaceport-background'

    if(destination === 'planets' && planetNumber === 1) choice = 'planet-background-1'
    if(destination === 'planets' && planetNumber === 2) choice = 'planet-background-2'
    if(destination === 'planets' && planetNumber === 3) choice = 'planet-background-3'
    if(destination === 'planets' && planetNumber === 4) choice = 'planet-background-4'
    if(destination === 'planets' && planetNumber === 5) choice = 'planet-background-5'
    if(destination === 'planets' && planetNumber === 6) choice = 'planet-background-6'
    if(destination === 'planets' && planetNumber === 7) choice = 'planet-background-7'
    if(destination === 'planets' && planetNumber === 8) choice = 'planet-background-8'
    if(destination === 'planets' && planetNumber > 8) choice = 'planet-background-9'

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
                <div className="gallery-card-font shadow">{smallTag}</div>
                <div className="gallery-card-font-2 shadow">{bigTag}</div>
                {!disable && ( 
                <div onClick={onClick} className="button animate">
                    <div className="hover-effect"></div>
                    <span className="button-font">{buttonText}</span>
                </div>
                 )}
            </div>
        </div>
    )
}

export default GalleryCard