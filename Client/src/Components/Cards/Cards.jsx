import Card from "../Card/Card"


const Cards = ({songs}) => {
    return (
        <div>
            {songs.map((song) => {
                return (
                    <Card id = {song.id}
                        name = {song.name}
                        genre = {song.genre}
                        url = {song.url}/>
                )
            })}
        </div>
    )
}

export default Cards;