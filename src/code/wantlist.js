const Discogs = require('disconnect').Client;
const fs = require('fs');
const path = require('path');
const debug = require('debug')('wantlist');

const user = new Discogs().user();
const masterIDs = new Set();
const albums = new Set();

const getFullWantlist = async function (page = 1) {
    user.wantlist().getReleases('danodea1', {'page': page}, function(err, data){
        processWantlistData(data.wants);
        debug(data.pagination.page);

        if (data.pagination.page < data.pagination.pages) {
            getFullWantlist(data.pagination.page + 1)
        } else {
            fs.writeFileSync(path.join(__dirname, '../data/masterIDs.json'), JSON.stringify([...masterIDs]));
            // fs.writeFileSync(path.join(__dirname, '/albums.json'), JSON.stringify([...albums]));
        }
})};

//expects the "wants" array from the api data
const processWantlistData = function (wants) {
    wants.forEach((want) => {
        masterIDs.add(want.basic_information.master_id ? want.basic_information.master_id : want.basic_information.id);
        albums.add(`${want.basic_information.artists[0].name} - ${want.basic_information.title.trim()}`);
    })
};

getFullWantlist();