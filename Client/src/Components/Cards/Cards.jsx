import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ songs }) => {
  return (
    <div className={style.cards_container}>
      {songs.map((song) => {
        return (
          <Card
            key={song.id}
            id={song.id}
            name={song.name}
            image={song.imageUrl}
            genre={song.genre}
            url={song.url}
          />
        );
      })}
    </div>
  );
};

export default Cards;
