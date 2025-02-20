import React, {useState, useEffect} from 'react';

// Should have used tailwind but...
const svgCss = `
.cls-1 {
    fill-rule:evenodd;
    stroke: white;
    fill: white;
}
.favourite .cls-1 {
    stroke: #d8b4fe;
    fill: #d8b4fe;
}
`;

const CatModal = ({isOpen, onClose, cat}) => {
    if (!isOpen) return null;
    const [isFavourite, setIsFavourite] = useState(false);

    // LocalStorage will do for this example as our "back-end" to save user data
    useEffect(() => {
        if (!cat) return;

        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setIsFavourite(favourites.includes(cat.id));
    }, [cat]);

    let fadeTimer;

    const copyUrl = () => {
        navigator.clipboard.writeText(location.href);

        const msg = document.getElementById("copiedMsg");
        if (!msg) return;

        msg.classList.remove("opacity-0");
        msg.classList.add("opacity-100");

        if (fadeTimer) clearTimeout(fadeTimer);
        fadeTimer = setTimeout(() => {
            msg.classList.remove("opacity-100");
            msg.classList.add("opacity-0");
        }, 1500);
    }

    const toggleFavourite = () => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        let updatedFavourites;

        if (favourites.includes(cat.id)) {
            // Remove fav
            updatedFavourites = favourites.filter((id) => id !== cat.id);
            setIsFavourite(false);
        } else {
            // Add fav
            updatedFavourites = [...favourites, cat.id];
            setIsFavourite(true);
        }
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    // Did not write this one
    const flattenObject = (obj) => {
        const result = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                Object.entries(value).forEach(([subKey, subValue]) => {
                    result[`${key}.${subKey}`] = subValue;
                });
            } else {
                result[key] = value;
            }
        });
        return result;
    };


    return (
        <div
            className={"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" + ((isFavourite) ? ' favourite' : '')}>
            <div
                className="bg-black outline-offset-2 outline-2 outline outline-purple-300 p-6 rounded shadow-lg relative max-w-96 lg:max-w-[80vw] max-h-96 lg:max-h-[60vh] w-full h-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl leading-none hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 7 7" fill="none">
                        <path
                            d="M0.2164 0.933662C0.0385725 0.760569 0.038573 0.474875 0.2164 0.301782C0.387569 0.13517 0.660288 0.13517 0.831457 0.301782L6.52044 5.83931C6.69827 6.0124 6.69827 6.2981 6.52044 6.47119C6.34928 6.6378 6.07656 6.6378 5.90539 6.47119L0.2164 0.933662Z"
                            fill="white"/>
                        <path
                            d="M5.84169 0.481933C6.01286 0.315322 6.28558 0.315322 6.45675 0.481934C6.63458 0.655027 6.63458 0.940721 6.45675 1.11381L0.767762 6.65134C0.596593 6.81795 0.323875 6.81795 0.152706 6.65134C-0.0251208 6.47825 -0.0251208 6.19255 0.152706 6.01946L5.84169 0.481933Z"
                            fill="white"/>
                    </svg>
                </button>

                {cat && (
                    <div
                        className="grid lg:grid-cols-2 grid-cols-1 gap-[10px] lg:gap-[20px] max-h-[50vh] lg:max-h-[55vh] grid-rows-[minmax(55vh,1fr)]">
                        <div className="image-container">
                            <img
                                src={cat.url}
                                alt="Cat"
                                className="mb-4 w-full h-auto max-h-full object-cover rounded"
                            />
                        </div>
                        <div className="flex flex-col text-white gap-[20px]">
                            <div className="actions flex gap-[20px] items-center">
                                <button onClick={toggleFavourite}>
                                    {/*Add to favourite*/}
                                    <svg id="Layer_1" data-name="Layer 1" width="50" height="50"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 122.88 109.57">
                                        <defs>
                                            <style>{svgCss}</style>
                                        </defs>
                                        <title>add-to-favourites</title>
                                        <path className="cls-1 transition duration-200 ease-in-out"
                                              d="M94.26,44.46A26.88,26.88,0,1,1,67.38,71.34,26.88,26.88,0,0,1,94.26,44.46ZM65.45,19.57l-4.52,4.74-4.52-4.43C49,12.58,43.4,7.08,31.89,6.93L30.46,7A25.75,25.75,0,0,0,13.74,13.6,22.58,22.58,0,0,0,6.63,30.17l0,1.37c.69,19.27,19.13,36.08,34.42,50,3,2.69,5.78,5.27,8.49,7.88l11.27,10.85,5.91-5.87c.68.8,1.39,1.58,2.13,2.32l0,0c.82.83,1.69,1.61,2.59,2.36l-10.59,10.5L45,94.22c-2.49-2.39-5.37-5-8.37-7.75C20.37,71.68.81,53.85,0,31.77l0-1.68A29.12,29.12,0,0,1,9.21,8.73a32.42,32.42,0,0,1,21-8.42H32c14,.18,20.45,6.34,28.8,14.55C67.66,7.54,73.39,1.55,85,.21a33.88,33.88,0,0,1,19,3.45,35.14,35.14,0,0,1,12.51,10.48,31.53,31.53,0,0,1,6.1,15.18,31,31,0,0,1-2.86,16.81l-.17-.18a36.18,36.18,0,0,0-5.14-4.27,24.26,24.26,0,0,0,1.57-11.6,25,25,0,0,0-4.83-12,28.62,28.62,0,0,0-10.14-8.5A27.27,27.27,0,0,0,85.79,6.82C76.47,7.89,71.5,13.17,65.45,19.57ZM90.29,60a3.85,3.85,0,0,1,.31-1.51l0-.06a3.92,3.92,0,0,1,.83-1.23,4,4,0,0,1,2.78-1.16h0a4.23,4.23,0,0,1,1.51.3,4.16,4.16,0,0,1,1.29.86,3.87,3.87,0,0,1,.85,1.28l0,.07A4.18,4.18,0,0,1,98.22,60V68h7.93a4,4,0,0,1,1.51.3,3.94,3.94,0,0,1,1.29.86,4,4,0,0,1,.85,1.28l0,.06a4,4,0,0,1,.28,1.38V72a3.82,3.82,0,0,1-.3,1.44,4,4,0,0,1-.86,1.29,3.88,3.88,0,0,1-1.27.85l-.07,0a4.23,4.23,0,0,1-1.43.28h-8v7.93a4,4,0,0,1-.3,1.51,4.11,4.11,0,0,1-.86,1.29l-.08.07a3.88,3.88,0,0,1-1.2.78l-.07,0a4.18,4.18,0,0,1-1.43.28h0a4,4,0,0,1-1.51-.3,3.94,3.94,0,0,1-1.29-.86,3.73,3.73,0,0,1-.85-1.27,4.05,4.05,0,0,1-.31-1.5V75.9H82.37a3.85,3.85,0,0,1-1.51-.31l-.06,0a3.92,3.92,0,0,1-1.23-.83,3.87,3.87,0,0,1-.85-1.28l0-.07A4.23,4.23,0,0,1,78.41,72v0a3.8,3.8,0,0,1,.3-1.51A3.95,3.95,0,0,1,82.34,68h8V60Z"/>
                                    </svg>
                                </button>
                                <div className="text-2xl font-bold cursor-pointer" onClick={copyUrl}>Share the link!
                                </div>
                                <span id="copiedMsg"
                                      className="text-2xl font-bold transition-opacity duration-500 opacity-0">
                                    Copied!
                                </span>
                            </div>
                            <div className="flex flex-col text-white gap-2 lg:overflow-y-auto custom-scrollbar">
                                <h2 className="font-bold text-4xl text-center text-white">Breed Info:</h2>
                                {cat.breeds?.length > 0 ? (
                                    cat.breeds.map((breed, index) => {
                                        const flatBreed = flattenObject(breed);
                                        return (
                                            <div key={index} className="mb-4">
                                                {Object.entries(flatBreed).map(([key, value]) => (
                                                    <div key={key} className="flex">
                                                        {/* Too much info here, maybe request just a couple of things?
                                                         Like... their internal "voting system" doesn't make much sense
                                                         to humans as a number, ie. "intelligence: 5" */}
                                                        <div className="font-bold mr-2 capitalize">{key}:</div>
                                                        <div>{value.toString()}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <span className="text-white">No breed info found... sorry!</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatModal;
