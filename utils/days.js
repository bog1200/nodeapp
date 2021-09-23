
const moment = require('moment');
module.exports.days = ((today,days) => {return moment(today.parsedOnString, "YYYY-MM-DD").subtract(days, 'days').format("YYYY-MM-DD")});