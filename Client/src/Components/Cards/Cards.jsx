import Card from "../Card/Card";
// import style from "./Cards.module.css";

const Cards = ({ songs }) => {
  return (
    <div className=" flex flex-row max-md:flex-col justify-center items-center gap-5 w-screen mt-[2rem] mb-[2rem]">
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
