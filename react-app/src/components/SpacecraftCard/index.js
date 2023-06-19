// Necessary imports
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneSpacecraft } from "../../store/spacecraft";
import './SpacecraftCard.css'

function SpacecraftCard({ spacecraft }){
    // Create a dispatch method
    const dispatch = useDispatch()

    // Create onClick function
    const onClick = () => {
        dispatch(getOneSpacecraft(spacecraft.id))
    }

    return (
        <NavLink exact to={`/spacecrafts/${spacecraft.id}`} onClick={onClick}>
            <div className="spacecraft-card-container">
                <div className="image-container">
                    <img style={{ height: '300px', width: '100%' }} src="https://media.istockphoto.com/id/1131418344/photo/space-shuttle-in-the-rays-of-sun.jpg?s=1024x1024&w=is&k=20&c=fTUNSaSwt1VwjCFU-GnSBZuB3rbsK-W35AaxTLaRPkA=" alt='' />
                </div>
                <div className="model-container">Model: {spacecraft.model}</div>
                <div className="description-container">Model Year: {spacecraft.year}</div>
                <div className="description-container">Load Capacity: {spacecraft.load_capacity_kg}</div>
            </div>
        </NavLink>
    )
}

export default SpacecraftCard