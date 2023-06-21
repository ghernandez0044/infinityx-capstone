// Necessary imports
import { NavLink } from "react-router-dom";

function SpaceportCard({ spaceport }){

    return (
        <NavLink exact to={`/spaceports/${spaceport.id}`} onClick={onClick}>
            <div className="spaceport-card-container">
                <img style={{ height: '300px', width: '300px' }} src="https://media.istockphoto.com/id/1321530574/photo/nasa-building-and-antenna-at-vandenberg-space-force-base-lompoc-ca-usa.jpg?s=1024x1024&w=is&k=20&c=S6wCqzyGFEf3PK1FVUgm-MW4M1yMmV_ac6lp4V_0y3s=" alt='' />
            </div>
            <div>Name: {spaceport.name}</div>
            <div>Location: {spaceport.city}, {spaceport.state}</div>
            <div>Description: {spaceport.description}</div>
        </NavLink>
    )
}

export default SpaceportCard