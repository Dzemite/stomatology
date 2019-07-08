"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pd_model_1 = require("../models/pd.model");
exports.patientsList = (req, res) => {
    if (res.locals.user.computedPermissions.indexOf("pd-proxy_read") === -1 &&
        res.locals.user.computedPermissions.indexOf("admin_users") === -1) {
        res.statusCode = 403;
        res.json({ msg: "Не хватает прав доступа для просмотра персональных данных." });
        return;
    }
    const responseObject = {};
    // Pagination
    const offset = req.headers.offset ? req.headers.offset : '0';
    const limit = req.headers.limit ? req.headers.limit : '50';
    const skipedElements = calcSkip(offset, limit);
    // Search
    let searchOption = {};
    if (req.query) {
        searchOption = req.query;
    }
    // Sorting
    const sortField = req.headers.sort_field ? req.headers.sort_field.toString() : null;
    const sortDirection = req.headers.sort_direction ? req.headers.sort_direction.toString() : '';
    const sortOption = {};
    try {
        if (sortField !== null) {
            sortOption[sortField] = sortDirection;
        }
    }
    catch (error) {
        console.error(error);
        console.error('sort_field and sort_direction should be a strings');
        res.sendStatus(400);
    }
    const startDate = new Date();
    console.log(`Start geting pd list on ${startDate}`);
    console.log('Options to find patient: ');
    console.log(searchOption);
    console.log(sortOption);
    console.log(skipedElements);
    console.log(limit);
    pd_model_1.PDModel.find(searchOption)
        .count((err, count) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        responseObject.length = count;
    });
    return pd_model_1.PDModel.find(searchOption)
        .sort(sortOption)
        .skip(skipedElements)
        .limit(+limit)
        .then((pd) => {
        console.log('pd list found.');
        pd.filter(pat => {
            return pat.deleted !== true;
        });
        responseObject.pd = pd;
        res.json(responseObject);
    })
        .catch((e) => {
        console.log("Error: MongoDB query error.");
        console.log(e.stack);
        res.sendStatus(500);
    });
};
function calcSkip(offset, limit) {
    let skipEl;
    try {
        skipEl = +offset * +limit;
    }
    catch (error) {
        console.log("Can't calculate parameter for pagination.");
        console.log(error);
        return 0;
    }
    return skipEl;
}
