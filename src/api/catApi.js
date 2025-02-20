const BASE_URL = 'https://api.thecatapi.com/v1';
/* UNSAFE - but for a demo it's enough to acknowledge this I believe! */
const apiKey = 'live_noDwu5UuC0SisClUVGdhtQQenduR8ORuuUKvkqsN5zLKcOTnFucjYPjhQEplg848';

export const getCatImages = (page = 0, limit = 10) => {
    const params = new URLSearchParams({
        api_key: apiKey,
        limit: limit,
        page: page,
    });
    const url = `${BASE_URL}/images/search?${params.toString()}`;
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

export const getCatById = (catId) => {
    const url = `${BASE_URL}/images/${catId}`;
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

/*
export const getCatBreedById = (breedId) => {
    const url = `${BASE_URL}/breeds/${breedId}`;
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}*/
