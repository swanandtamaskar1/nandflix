import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import MovieModal from "../components/MovieModal";



function Home() {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [trending, setTrending] = useState([]);

    useEffect(() => {

        const fetchTrending = async () => {

            try {

                const res = await tmdb.get("/trending/movie/week");

                const validMovies =
                    res.data.results.filter(m => m.backdrop_path);

                setTrending(validMovies);

            } catch (err) {
                console.log(err);
            }
        };

        fetchTrending();

    }, []);

    const heroMovie = trending[0];
    const trendingWithoutHero = trending.slice(1);

    return (
        <>
            <Navbar />

            <Hero
                movie={heroMovie}
                onPlay={(movie) => setSelectedMovie(movie)}
                onMoreInfo={(movie) => setSelectedMovie(movie)}
            />


            <div className="bg-black text-white px-6 pb-10">

                <MovieRow
                    title="Trending"
                    customMovies={trendingWithoutHero}
                    onMovieSelect={(movie) => setSelectedMovie(movie)}
                />


                <MovieRow
                    title="Top Rated"
                    fetchUrl="/movie/top_rated"
                    onMovieSelect={(movie) => setSelectedMovie(movie)}
                />


                <MovieRow
                    title="Action"
                    fetchUrl="/discover/movie?with_genres=28"
                    onMovieSelect={(movie) => setSelectedMovie(movie)}
                />

                <MovieRow
                    title="Comedy"
                    fetchUrl="/discover/movie?with_genres=35"
                    onMovieSelect={(movie) => setSelectedMovie(movie)}
                />

            </div>
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    autoPlay={true}
                />

            )}

        </>
    );
}

export default Home;
