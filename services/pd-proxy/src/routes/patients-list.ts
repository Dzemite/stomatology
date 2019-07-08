import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { PDModel } from "../models/pd.model";

export const patientsList = (req: Request, res: Response) => {

    if (res.locals.user.computedPermissions.indexOf("pd-proxy_read") === -1 &&
    res.locals.user.computedPermissions.indexOf("admin_users") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для просмотра персональных данных."});
        return;
    }

    const responseObject: any = {};

    // Pagination
    const offset = req.headers.offset ? req.headers.offset : '0';
    const limit = req.headers.limit ? req.headers.limit : '50';
    const skipedElements = calcSkip(offset, limit);

    // Search
    let searchOption: ISearchObject = {};
    if (req.query) {
        searchOption = req.query;
    }

    // Sorting
    const sortField = req.headers.sort_field ? req.headers.sort_field.toString() : null;
    const sortDirection = req.headers.sort_direction ? req.headers.sort_direction.toString() : '';
    const sortOption: ISortObject = {};
    try {
        if (sortField !== null) {
            sortOption[sortField] = sortDirection;
        }
    } catch (error) {
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

    PDModel.find(searchOption)
        .count((err, count) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            responseObject.length = count;
        });

    return PDModel.find(searchOption)
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
        .catch(
            (e: MongoError) => {
                console.log("Error: MongoDB query error.");
                console.log(e.stack);
                res.sendStatus(500);
            }
        )
};

function calcSkip(offset: string | string[], limit: string | string[]) {

    let skipEl: number;

    try {
        skipEl = +offset * +limit;
    } catch (error) {
        console.log("Can't calculate parameter for pagination.");
        console.log(error);
        return 0;
    }
    return skipEl;
}

interface ISearchObject {
    [key: string]: any;
}

interface ISortObject {
    [key: string]: any;
}