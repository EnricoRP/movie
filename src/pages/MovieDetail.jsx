import React from 'react'

const MovieDetail = () => {

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <div className=" h-full w-full mx-auto bg-zinc-900 p-6 rounded-2xl shadow-xl shadow-light-100/10">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-3xl font-bold">Squid Game 2</h1>
                            <p className="text-gray-400 text-sm">2024 • PG-13 • 2h 46m</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-400 text-black px-2 py-1 rounded font-bold text-sm">⭐ 8.9/10</div>
                            <div className="text-red-500">❤️ 1</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <img src="poster.jpg" alt="Poster" className="w-full h-auto rounded-lg object-cover" />
                        <div className="relative">
                            <img src="trailer.jpg" alt="Trailer" className="w-full h-auto rounded-lg object-cover" />
                            <button className="absolute bottom-3 left-3 bg-white text-black px-3 py-1 text-xs rounded shadow">
                                ▶ Trailer • 0:31
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center flex-wrap gap-2 mt-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Adventure</span>
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Action</span>
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Drama</span>
                        </div>
                        <a href="#" className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded transition">
                            Visit Homepage →
                        </a>
                    </div>

                    <div className="grid grid-cols-1 gap-y-2 text-sm text-left">
                        <div className="grid grid-cols-[150px_1fr] gap-y-2 text-sm text-white">
                            <div className="font-semibold">Release date:</div>
                            <div>December 26, 2024</div>

                            <div className="font-semibold">Countries:</div>
                            <div>United States • Canada • UAE • Hungary • Italy • New Zealand</div>

                            <div className="font-semibold">Status:</div>
                            <div>Released</div>

                            <div className="font-semibold">Language:</div>
                            <div>English • Korean • Hindi • Arabic • German • Spanish</div>

                            <div className="font-semibold">Budget:</div>
                            <div>$21.4 million</div>

                            <div className="font-semibold">Revenue:</div>
                            <div>$900 million</div>

                            <div className="font-semibold">Tagline:</div>
                            <div>45.6 Billion Won is Child's Play</div>

                            <div className="font-semibold">Production Companies:</div>
                            <div>Legendary Entertainment • Warner Bros. Entertainment • Villeneuve Films</div>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default MovieDetail
