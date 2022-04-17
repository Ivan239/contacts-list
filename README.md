# Test project Contacts

You can authorize and set contacts: add, change, edit. Server based on JSON server.

Redux is using as a state manager.

## How to start

**All scripts runs in client folder!**

### `npm i`
For installing dependencies

### `npm run server`
For starting server. You can change host with editing package.json: `client -> package.json -> scripts -> server -> change host` (default is localhost).
Also you need to change serverhost.ts on new value.

Server is limited by 25 accounts because of JSON server features. To add more people add to server db `data_{newId}` as others.

### `npm start`
For starting client.
