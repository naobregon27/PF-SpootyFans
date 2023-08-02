

const Card = ({id, name, genre, url}) => {

    return( 
        <div>

        <h2>{name}</h2>
        <h3>{genre}</h3>
        <h3>{url}</h3>

        </div>
    )
}

export default Card;