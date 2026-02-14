import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";

function Home() {

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

            <Hero movie={heroMovie} />

            <div className="bg-black text-white px-6 pb-10">

                <MovieRow
                    title="Trending"
                    customMovies={trendingWithoutHero}
                />

                <MovieRow
                    title="Top Rated"
                    fetchUrl="/movie/top_rated"
                />

                <MovieRow
                    title="Action"
                    fetchUrl="/discover/movie?with_genres=28"
                />

                <MovieRow
                    title="Comedy"
                    fetchUrl="/discover/movie?with_genres=35"
                />

            </div>
        </>
    );
}

export default Home;
