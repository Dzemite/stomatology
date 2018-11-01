"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestApiMiddlewareFactory {
    static getRestMiddlewareForModel(model, getBy = "id") {
        return (req, res) => {
            switch (req.method) {
                default:
                    // Список сущностей
                    if (!req.params[getBy]) {
                        const skip = parseInt(req.query.offset, 10) ? parseInt(req.query.offset, 10) : 0;
                        const limit = parseInt(req.query.limit, 10) ? parseInt(req.query.limit, 10) : 0;
                        let sort = {};
                        if (req.query.sort && req.query.order) {
                            sort[req.query.sort] = req.query.order;
                        }
                        model.find().skip(skip).limit(limit).sort(sort).then((entities) => {
                            const response = [];
                            for (const entity of entities) {
                                response.push(entity.toJSON({
                                    virtuals: true
                                }));
                            }
                            let countPromise = Promise.resolve();
                            if (limit > 0) {
                                countPromise = model.count({}).then((count) => {
                                    let contentRangeHeader = `entities ${skip + 1}-${skip + limit < count ? skip + limit : count}/${count}`;
                                    res.setHeader("Content-Range", contentRangeHeader);
                                })
                                    .catch((err) => {
                                    Promise.reject(err);
                                });
                            }
                            countPromise.then(() => {
                                res.send(response);
                            })
                                .catch((err) => {
                                console.error(err);
                                res.status(500);
                                res.send();
                            });
                        })
                            .catch((err) => {
                            console.error(err);
                            res.status(500);
                            res.send();
                        });
                    }
            }
        };
    }
}
exports.RestApiMiddlewareFactory = RestApiMiddlewareFactory;
