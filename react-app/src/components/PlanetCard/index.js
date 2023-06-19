// Necessary imports
import { NavLink } from "react-router-dom";


function PlanetCard({ planet }){

    // Create onClick function
    const onClick = () => {
        console.log('click')
    }


    return (
        <NavLink exact to={`/planets/${planet.id}`}>
            <div className="spaceport-card-container">
                <img style={{ height: '300px', width: '300px' }} src="https://t3.ftcdn.net/jpg/01/92/57/02/240_F_192570208_ryrcg7zlW3QKToJQt7y4Oqti8xGqzGXg.jpg" alt='' />
            </div>
            <div>Name: {planet.name}</div>
            <div>Distance From Earth: {planet.distance_from_earth_km} km</div>
        </NavLink>
    )
}

export default PlanetCard