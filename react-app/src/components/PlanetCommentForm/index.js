// Necessary imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updatePlanetComment } from "../../store/planetComments";
import { getOnePlanetComment } from "../../store/planetComments";

function PlanetCommentForm({ comment }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume useModal context
    const { closeModal } = useModal()

    // Extract desired variable from useParams
    // const { id } = useParams()

    // Create state variables
    const [ content, setContent ] = useState(comment.content || '')

    // Create update planet comment function
    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            content
        }
        dispatch(updatePlanetComment(payload, comment.id)).then(res => {
            dispatch(getOnePlanetComment(comment.planet_id))
        })
        closeModal()
    }

    return (
        <div className="planet-comment-text-input-container">
            <div className="comment-label-info">
                <label className="label-font">Comment: </label>
                <textarea style={{ height: '70px', width: '350px' }} type='text' value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Type your comment here"/>
            </div>
            <div className="planet-comment-button-container">
                    <div onClick={onSubmit} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="signup-button-font">Update Comment</span>
                    </div>
                </div>
        </div>
    )
}

export default PlanetCommentForm