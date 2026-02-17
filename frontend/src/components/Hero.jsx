function Hero({ movie, onPlay, onMoreInfo }) {

    if (!movie) return null;

    return (
        <div className="relative h-[75vh] w-full">

            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute w-full h-full object-cover"
            />

            <div className="absolute w-full h-full bg-gradient-to-r from-black via-black/70 to-transparent" />

            <div className="absolute bottom-20 left-10 max-w-xl text-white">

                <h1 className="text-5xl font-bold mb-4">
                    {movie.title}
                </h1>

                <p className="mb-6 text-gray-300">
                    {movie.overview}
                </p>

                <div className="flex gap-4">

                    <button
                        onClick={() => onPlay(movie)}
                        className="bg-white text-black px-6 py-2 rounded font-semibold"
                    >
                        ▶ Play
                    </button>

                    <button
                        onClick={() => onMoreInfo(movie)}
                        className="bg-gray-700 px-6 py-2 rounded text-white"
                    >
                        More Info
                    </button>

                </div>
            </div>

        </div>
    );
}

export default Hero;
