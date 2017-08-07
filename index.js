var fetch = require('node-fetch');
var BASE_URL = "http://api.pexels.com/v1/";
var DIRECTORY = {
    SEARCH_URL: BASE_URL + "search",
    POPULAR_URL: BASE_URL + "popular"
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
 * Promise factory to interact with Pexels Search API
 * @param {string} query Search term
 * @param {number} perPage Specifies the number of items per page (Defaults to 10)
 * @param {page} page Specifies the page being requested (Defaults to 1)
 */
PexelsApi.prototype.search = function (query, perPage, page) {
    var self = this;
    var url = DIRECTORY.SEARCH_URL +
        "?query=" + (query ? encodeURIComponent(query) : "") +
        "&per_page=" + (perPage && !isNaN(perPage) ? +perPage : 10) +
        "&page=" + (page && !isNaN(page) ? +page : 1);
    return fetch(url, {
            headers: self.headers
        })
        .then(function (res) {
            return res.json();
        }).catch(function (err) {
            return Promise.reject(err);
        });
};

/**
 * Promise factory to interact with Pexels Popular Photos API
 * @param {number} perPage Specifies the number of items per page (Defaults to 10)
 * @param {page} page Specifies the page being requested (Defaults to 1)
 */
PexelsApi.prototype.getPopularPhotos = function (perPage, page) {
    var self = this;
    var url = DIRECTORY.POPULAR_URL +
        "?per_page=" + (perPage && !isNaN(perPage) ? +perPage : 10) +
        "&page=" + (page && !isNaN(page) ? +page : 1);
    return fetch(url, {
            headers: self.headers
        })
        .then(function (res) {
            return res.json();
        }).catch(function (err) {
            return Promise.reject(err);
        });
};

module.exports = PexelsApi;