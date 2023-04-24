// Necessary imports
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import './GalleryCard.css'

function GalleryCard({ smallTag, bigTag, buttonText, destination, payload }){

    let choice = ''

    if(destination === 'spacecrafts'){
        // history.push(`/spacecrafts/${payload.id}`)
        choice = 'spacecraft-background'
    }

    if(destination === 'spaceports'){
        console.log()
        // history.push(`/spaceports/${payload.id}`)
        choice = 'spaceport-background'
    }

    if(destination === 'planets'){
        // history.push(`/planets/${payload.id}`)
        choice = 'planet-background'
    }


    // Create history method
    const history = useHistory()

    // Function to handle button click
    const onClick = () => {
        if(destination === 'spacecrafts'){
            history.push(`/spacecrafts/${payload.id}`)
        }

        if(destination === 'spaceports'){
            console.log()
            history.push(`/spaceports/${payload.id}`)
        }

        if(destination === 'planets'){
            history.push(`/planets/${payload.id}`)
        }
    }


    return (
        <div className={`section-a-container sizing ${choice}`}>
            <div className="section-content">
                <h4>{smallTag}</h4>
                <h2>{bigTag}</h2>
                <div onClick={onClick} className="button animate">
                    <div className="hover-effect"></div>
                    <span>{buttonText}</span>
                </div>
            </div>
        </div>
    )
}

export default GalleryCard