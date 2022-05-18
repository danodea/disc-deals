const debug = require('debug')('loop');
const getListings = require('./listings')
const masterIDs = require('../data/masterIDs');

Promise.all(masterIDs.map((id) => getListings(id)));