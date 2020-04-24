/* eslint-disable */
var regex = new RegExp([
  'localhost:(8080|8181|8282|8383|9001)$',
  'sloops.waat.eu$',
  'sloops.today$',
].join('|'));

CrossStorageHub.init([{
  origin: regex,
  allow: ['get', 'set', 'del', 'getKeys', 'clear'],
}]);
