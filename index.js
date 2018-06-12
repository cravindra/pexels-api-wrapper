var fetch = require('node-fetch');
var BASE_URL = "https://api.pexels.com/";
var DIRECTORY = {
    SEARCH_URL: BASE_URL + "v1/search",
    POPULAR_URL: BASE_URL + "v1/popular",
    CURATED_URL: BASE_URL + "v1/curated",
    VIDEO_SEARCH_URL: BASE_URL + "videos/search",
    POPULAR_VIDEO_URL: BASE_URL + "videos/popular",
    PHOTO_URL: BASE_URL + "v1/photos/"
};

/**
 * Pexels API wrapper which exposes Promise factories to interact with the Pexels API endpoints
 * @param {string} apiKey API Key provided by Pexels (Required)
 */
function PexelsApi(apiKey) {
    if (!apiKey) {
        throw new Error("API Key missing");
    }
    var self = this;
    self.apiKey = apiKey;
    self.headers = {
        'Authorization': apiKey
    };
}

/**
 * Prepare Pexels API request url and parameters
 * @param {string} directory
 * @param {string} query
 * @param {number} perPage
 * @param {number} page
 * @returns {string}
 */
function prepareUrl(directory, query, perPage, page) {
    var search = query ? "query=" + (query ? encodeURIComponent(query) : "") : "";
    return directory + "?" + search +
        "&per_page=" + (perPage && !isNaN(perPage) ? +perPage : 10) +
        "&page=" + (page && !isNaN(page) ? +page : 1);
}

/**
 * Send request to Pexels API and return response
 * @param {PexelsApi} self
 * @param {string} url
 * @returns {Promise}
 */
function request(self, url) {
    return fetch(url, {
        headers: self.headers
    })
        .then(function (res) {
            return res.json();
        }).catch(function (err) {
            return Promise.reject(err);
        });
}

/**
 * Promise factory to interact with Pexels Search API
 * @param {string} query Search term
 * @param {number} perPage Specifies the number of items per page (Defaults to 10)
 * @param {number} page Specifies the page being requested (Defaults to 1)
 * @returns {Promise}
 */
PexelsApi.prototype.search = function (query, perPage, page) {
    var url = prepareUrl(DIRECTORY.SEARCH_URL, query, perPage, page);
    return request(this, url);
};

/**
 * Promise factory to interact with Pexels Popular Photos API
 * @param {number} perPage Specifies the number of items per page (Defaults to 10)
 * @param {number} page Specifies the page being requested (Defaults to 1)
 * @returns {Promise}
 */
PexelsApi.prototype.getPopularPhotos = function (perPage, page) {
    var url = prepareUrl(DIRECTORY.POPULAR_URL, null, perPage, page);
    return request(this, url);
};

/**
 * Promise factory to interact with Pexels Curated Photos API
 * @param {number} perPage Specifies the number of items per page (Defaults to 10)
 * @param {number} page Specifies the page being requested (Defaults to 1)
 * @returns {Promise}
 */
PexelsApi.prototype.getCuratedPhotos = function (perPage, page) {
    var url = prepareUrl(DIRECTORY.CURATED_URL, null, perPage, page);
    return request(this, url);
};

/**
 * Promise factory to interact with Pexels Videos API
 * @param {string} query Search term
 * @param {number} perPage Specifies the number of items per page (Defaults to 10)
 * @param {number} page Specifies the page being requested (Defaults to 1)
 * @returns {Promise}
 */
PexelsApi.prototype.searchVideos = function (query, perPage, page) {
    var url = prepareUrl(DIRECTORY.VIDEO_SEARCH_URL, query, perPage, page);
    return request(this, url);
};

/**
 * Promise factory to interact with Pexels Popular Videos API
 * @param {number} perPage Specifies the number of items per page (Defaults to 10)
 * @param {number} page Specifies the page being requested (Defaults to 1)
 * @returns {Promise}
 */
PexelsApi.prototype.getPopularVideos = function (perPage, page) {
    var url = prepareUrl(DIRECTORY.POPULAR_VIDEO_URL, null, perPage, page);
    return request(this, url);
};

/**
 * Promise factory to interact with Pexels API to request a specific photo by ID
 * @param {number} id
 * @returns {Promise}
 */
PexelsApi.prototype.getPhoto = function (id) {
    var url = DIRECTORY.PHOTO_URL + id;
    return request(this, url);
};

module.exports = PexelsApi;
