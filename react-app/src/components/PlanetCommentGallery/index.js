// Necessary imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOnePlanetComment, createPlanetComment } from "../../store/planetComments";
import PlanetCommentCard from "../PlanetCommentCard";
import './PlanetCommentGallery.css'

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
    const planetComments = useSelector(state => Object.values(state.planetComments.singlePlanetComments))

    // Create state variable
    const [ content, setContent ] = useState('')

    // Function to reset all fields on form
    const reset = () => {
        setContent('')
    }

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()
        const comment = {
            content
        }
        dispatch(createPlanetComment(comment, id))
        dispatch(getOnePlanetComment(id))
        reset()
    }
    
    return (
        <>
            <div className="planet-comment-gallery-page">
                <div className="planet-comment-gallery-container">
                    {planetComments?.map(comment => (
                        <PlanetCommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
            <div className="planet-comment-text-input-container">
                <div className="comment-label-info">
                    <label className="label-font">Comment: </label>
                    <textarea style={{ height: '70px', width: '350px' }} type='text' value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Type your comment here"/>
                </div>
                <div className="planet-comment-button-container">
                    {/* <button onClick={onSubmit}>Comment</button> */}
                    <div onClick={onSubmit} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="signup-button-font">Comment</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlanetCommentGallery