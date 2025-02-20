/*
import BreedModal from './BreedModal';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCatImages, getCatById } from '../api/catApi';

const MainBreedDisplay = () => {
    const [cats, setCats] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Flag to prevent strictMode from running the query again
    const fetchedPages = useRef({});
    const fetchedModalCats = useRef({});

    // Modal stuff
    const [modalCatData, setModalCatData] = useState(null)
    const { id: modalCatId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const selectedCat = modalCatId && (cats.find((cat) => cat.id === modalCatId) || modalCatData);

    useEffect(() => {
        if (fetchedPages.current[page]) return;
        fetchedPages.current[page] = true;

        setLoading(true);
        getCatImages(page, 10)
            .then((jsonData) => {
                setCats((prevCats) => [...prevCats, ...jsonData]);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    useEffect(() => {
        if (modalCatId && !cats.find((cat) => cat.id === modalCatId)) {
            if (fetchedModalCats.current[modalCatId]) return;
            fetchedModalCats.current[modalCatId] = true;

            getCatById(modalCatId)
                .then((catData) => {
                    if(typeof catData !== 'object') throw new Error('Something went wrong with the API');

                    setModalCatData(catData);
                })
                .catch((err) => setError(err.message));
        }
    }, [modalCatId, cats]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleCatClick = (cat) => {
        navigate(`/cat/${cat.id}`, { state: { background: location } });
    };

    const closeModal = () => {
        navigate('/');
    };

    if ((loading || !cats.length) && page === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error && page === 0) {
        return (
            <div className="bg-red-100 text-red-700 p-4 rounded">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-white text-center mx-auto mb-4 font-bold text-4xl lg:text-6xl">Browse our cats!</h1>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 lg:gap-[20px]">
                {cats.length && cats.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => handleCatClick(cat)}
                        className="p-4 text-center cursor-pointer rounded-[10px] group overflow-clip transition duration-200 ease-in-out hover:scale-110">
                        <img src={cat.url} alt="Cat" className="rounded-[10px] outline-offset-2 outline-2 outline outline-purple-300 max-w-full object-cover"/>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                {loading ? (
                    <div className="text-xl">Loading...</div>
                ) : (
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-4 bg-purple-300 font-bold text-2xl text-black rounded-xl hover:bg-purple-600 hover:text-white transition duration-200 ease-in-out"
                    >
                        Load More
                    </button>
                )}
            </div>
            {modalCatId && selectedCat && (
                <BreedModal isOpen={true} onClose={closeModal} cat={selectedCat} />
            )}
        </div>
    );
};

export default MainBreedDisplay;
*/
