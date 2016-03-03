/**
 *  Factory for userID random generation.
 *  @return {string} format: 'XXXXXXXX-XXXXXXXX-XXXXXXXX'; X represents a letter or a cypher
 */
angular
    .module('notesApp')
    .factory("uidFactory", uidFactory);

function uidFactory() {
    return {
        getUID: function() {
            var getS4 = function() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return getS4() + getS4() + '-' + getS4() + getS4() + '-' + getS4() + getS4();
        }
    }
};