import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";

function MovieModal({ movie, onClose, autoPlay = false }) {

    const [videoKey, setVideoKey] = useState(null);

    useEffect(() => {

        const fetchTrailer = async () => {

            try {

                const res = await tmdb.get(`/movie/${movie.id}/videos`);

                const trailer = res.data.results.find(
                    v => v.type === "Trailer" && v.site === "YouTube"
                );

                if (trailer) {
                    setVideoKey(trailer.key);
                }

            } catch (err) {
                console.log(err);
            }
        };

        fetchTrailer();

    }, [movie.id]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

            <div className="bg-black w-[80%] max-w-4xl rounded-lg p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl"
                >
                    ✕
                </button>

                <h2 className="text-white text-3xl mb-4">
                    {movie.title}
                </h2>

                {videoKey ? (
                    <iframe
                        key={videoKey}
                        className="w-full h-[500px]"
                        src={`https://www.youtube.com/embed/${videoKey}${autoPlay ? "?autoplay=1" : ""}`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />


                ) : (
                    <p className="text-white">No trailer available</p>
                )}

            </div>
        </div>
    );
}

export default MovieModal;
