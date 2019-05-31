import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user";

export const createUserRoute = (req: Request, res: Response) => {
    console.log('Создание пользователя.');
    console.log('Ищим пользователя с таким же логином.');


    UserModel.findOne({
        username: req.body.username
    })
        .then((user: User) => {
            if (user) {
                console.log('Найден пользователь с такимже логином.');
                res.statusCode = 400;
                res.json({
                    error: 'Пользователь с таким логином уже есть.'
                });
            } else {
                console.log('Сохдаем нового пользователя.');

                const newUserModel = new UserModel(req.body);
                newUserModel.save();

                console.log('Пользователь создан.');

                res.statusCode = 200;
                res.json({
                    msg: 'Пользователь успешно содан.'
                });
            }

        });
};