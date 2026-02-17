import { useEffect, useState, useRef } from "react";
import { tmdb } from "../api/tmdb";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MovieRow({ title, fetchUrl, customMovies, onMovieSelect }) {


    const rowRef = useRef(null);

    const scrollLeft = () => {
        rowRef.current.scrollBy({
            left: -rowRef.current.offsetWidth,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        rowRef.current.scrollBy({
            left: rowRef.current.offsetWidth,
            behavior: "smooth"
        });
    };

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        if (customMovies) {
            setMovies(customMovies);
            return;
        }

        const fetchMovies = async () => {

            try {

                const res = await tmdb.get(fetchUrl);

                setMovies(
                    res.data.results.filter(m => m.poster_path)
                );

            } catch (err) {
                console.log(err);
            }
        };

        fetchMovies();

    }, [fetchUrl, customMovies]);


    return (
        <div className="mb-8 group">

            <h2 className="text-2xl font-bold mb-4">
                {title}
            </h2>

            <div className="relative">

                {/* LEFT BUTTON */}
                <button
                    onClick={scrollLeft}
                    className="opacity-0 group-hover:opacity-100 transition
           absolute left-2 top-1/2 -translate-y-1/2
           z-30
           bg-black/60 backdrop-blur-md hover:bg-black
           text-white p-3 rounded-full"

                >
                    <FaChevronLeft size={24} />
                </button>
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 
                bg-gradient-to-r from-black to-transparent z-0" />



                {/* MOVIE ROW */}
                <div
                    ref={rowRef}
                    className="flex gap-4 overflow-hidden"
                >



                    {movies.map(movie => (

                        <img
                            onClick={() => onMovieSelect(movie)}


                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="min-w-[180px] rounded-lg 
           hover:scale-110 hover:z-20 hover:shadow-2xl
           transition duration-300 
           cursor-pointer"
                        />

                    ))}

                </div>
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 
                bg-gradient-to-l from-black to-transparent z-0" />


                {/* RIGHT BUTTON */}
                <button
                    onClick={scrollRight}
                    className="opacity-0 group-hover:opacity-100 transition
           absolute right-2 top-1/2 -translate-y-1/2
           z-30
           bg-black/60 backdrop-blur-md hover:bg-black
           text-white p-3 rounded-full"
                >
                    <FaChevronRight size={24} />
                </button>


            </div>

        </div>
    );
}

export default MovieRow;
