const debug = require('debug')('filez');
const fs = require('fs');
const path = require('path');
const masterIDs = require('../data/masterIDs');

const listingParentFolder = path.join(__dirname, '..', '/data/listings');
const listingParentFolderExists = fs.existsSync(listingParentFolder);

const createOneListingFolder = function (name) {
    if (!listingParentFolderExists) {
        debug('Error: Parent Folder Does Not Exist');
        return
    }

    fs.mkdirSync(path.join(listingParentFolder, name));
}

const createAllListingFolders = function (names) {
    if (!listingParentFolderExists) {
        debug('Error: Parent Folder Does Not Exist');
        return
    }

    for (const folder of names) {
        createOneListingFolder('' + folder);
    }
}

const deleteOneListingFolder = function (name) {
    if (!listingParentFolderExists) {
        debug('Error: Parent Folder Does Not Exist');
        return
    }

    fs.rmdirSync(path.join(listingParentFolder, name));
}

const deleteAllListingFolders = function (names) {
    if (!listingParentFolderExists) {
        debug('Error: Parent Folder Does Not Exist');
        return
    }

    for (const folder of names) {
        deleteOneListingFolder('' + folder);
    }
}

const emptyOneListingFolder = async function (name) {
    if (!listingParentFolderExists) {
        debug('Error: Parent Folder Does Not Exist');
        return
    }

    const folderToEmpty = path.join(listingParentFolder, name);

    await fs.readdir(folderToEmpty, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(folderToEmpty, file), err => {
                if (err) throw err;
            })
        }
    })
}

const emptyAllListingFolders = function (names) {
    if (!listingParentFolderExists) {
        debug('Error: Parent Folder Does Not Exist');
        return
    }

    for (folder of names) {
        emptyOneListingFolder('' + folder)
    }

}