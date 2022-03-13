const debug = require('debug')('listings');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

const id = 1;

axios.get(`https://www.discogs.com/sell/list?sort=listed%2Cdesc&limit=250&master_id=${id}&ev=mb&currency=USD&format=Vinyl&ships_from=United+States&page=1`)
    .then(function (response) {
        const { document } = new JSDOM(response.data).window;

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

        debug(listings);

    }).catch((error) => {
        debug(error);
    })

