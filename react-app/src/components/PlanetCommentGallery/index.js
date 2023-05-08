// Necessary imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOnePlanetComment } from "../../store/planetComments";

function PlanetCommentGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Extract desired variable from parameters object
    const { id } = useParams()

    // Load planet comments into state upon component render
    useEffect(() => {
        dispatch(getOnePlanetComment(id))
    }, [dispatch, id])

    // Subscribe to slice of state for planet comments
    const planetComments = useSelector(state => state.planetComments)

    console.log('planet comments: ', planetComments)
    

    return (
        <div>
            <div>Planet Comment Gallery</div>
        </div>
    )
}

export default PlanetCommentGallery