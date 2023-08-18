import Card from "../Card/Card";
// import style from "./Cards.module.css";

const Cards = ({ songs }) => {
   return (
      <div className="w-screen flex justify-center items-center">
         <div className="w-[90%] grid grid-cols-5 justify-items-center gap-5 mt-8 mb-8">
            {songs.map((song) => {
               return (
                  <Card
                     key={song.id}
                     id={song.id}
                     name={song.name}
                     artist={song.artist}
                     image={song.imageUrl}
                     genre={song.genre}
                     url={song.url}
                     averageRating={song.averageRating}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default Cards;