import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user";

export const updateUserRoute = (req: Request, res: Response) => {
    console.log('Изменение пользователя.');
    console.log('Ищим пользователя.');
    UserModel.findOne({
        username: req.body.username
    })
        .then((user: User) => {
            console.log('Найден пользователь с такимже логином.');

            for (let key in user) {
                if (req.body[key] && req.body[key] !== user[key]) {
                    user[key] = req.body[key];
                }
            }

            console.log('Обновляем пользователя.');
            UserModel.updateOne({ username: req.body.username }, user, (err, affected, resp) => {
                if (err) {
                    console.log(`Обновление пользователя не удалось. ERROR: ${err}; ${affected}; ${resp}`);
                    res.statusCode = 500;
                    res.json({
                        err: `Обновление пользователя не удалось. ERROR: ${err}; ${affected}; ${resp}`
                    });
                }
            }).then(() => {
                console.log('Пользователь обновлен успешно.');
                res.sendStatus(200);
            });
        }).catch((err) => {
            console.log(`Пользователь не найден. ${err}`);
            res.statusCode = 400;
            res.json({
                err: 'Пользователь не найден.'
            });
        });
};