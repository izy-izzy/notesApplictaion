/**
 *  Modifies date to a specific string, eg. 'Today at 12:35', 'Yesterday at 12:35', '15/1/1988 at 12:35'.
 *  @param {number} date in ms from start of 1970
 *  @return {string} time with modified format
 */
angular
    .module('notesApp')
    .filter('customDateFilter', customDateFilter);

function customDateFilter() {
    return function(dateInMs) {
        var returnDate = "";
        if (dateInMs) {
            var now = Date.now();
            var date = new Date(dateInMs);
            var difference = now - dateInMs;
            var msInDay = 60 * 60 * 24 * 1000.0;
            var days = Math.floor(difference / msInDay);
            if (days === 0) {
                returnDate += "Today";
            } else if (days === 1) {
                returnDate += "Yesterday";
            } else {
                returnDate += date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
            }
            var minutes = date.getUTCMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var hours = date.getUTCHours();
            if (hours < 10) {
                hours = "0" + hours;
            }
            returnDate += " at " + hours + ":" + minutes;
        } else {
            return 0;
        }
        return returnDate;
    }
}
