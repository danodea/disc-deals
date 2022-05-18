const debug = require('debug')('listings');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');
const fs = require('fs');
const path = require('path');


module.exports = function getListings (id) {
    return axios.get(`https://www.discogs.com/sell/list?sort=listed%2Cdesc&limit=250&master_id=${id}&ev=mb&currency=USD&format=Vinyl&ships_from=United+States&page=1`)
        .then(function (response) {
            const { document } = new JSDOM(response.data).window;
            if (!document.querySelectorAll('.mpitems').length) {
                return
            }

            const listingNodes = Array.from(document.querySelectorAll('.mpitems')[0].children[1].children);

            const listings = []; 
            listingNodes.map((node) => {
                const listing = new JSDOM(node.outerHTML).window.document;
                const listingData = {};
                listingData.itemID = listing.querySelector('[data-item-id]').dataset.itemId;
                // I would strongly prefer to just do '.seller_info a' but it won't fucking find it!!!
                listingData.seller = listing.querySelector('.seller_label + strong a').textContent;
                listingData.price = listing.querySelector('.price').textContent;
                listings.push(listingData);
            })
            fs.writeFileSync(path.join(__dirname, '..', `/data/listings/${id}/1.json`), JSON.stringify(listings));
            debug(listings);

        }).catch((error) => {
            debug(error);
        })
}
