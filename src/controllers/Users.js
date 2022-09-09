const User = require("../models/User");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

const { generateAccessToken, encryptText } = require("../scripts/utils/helper");

const create = (req, res, next) => {
  User.find({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        if (user[0].email === req.body.email) {
          return next({
            statusCode: httpStatus.CONFLICT,
            message: "Mail exists",
          });
        }
        return next({
          statusCode: httpStatus.CONFLICT,
          message: "Username exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return next({
              statusCode: httpStatus.BAD_REQUEST,
              message: "User not created",
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash,
              full_name: req.body.full_name,
              username: req.body.username,
            });
            user
              .save()
              .then((result) => {
                result.password = undefined;
                const token = encryptText(
                  generateAccessToken({
                    _id: result._id,
                    email: result.email,
                    username: result.username,
                  })
                );

                return res.status(httpStatus.CREATED).json({
                  data: result,
                  message: "User created",
                  token: token,
                });
              })
              .catch((err) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                  message: "Internal Server Error",
                  err,
                });
              });
          }
        });
      }
    });
};

const index = (req, res) => {
  User.find({})
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  User.findOne(req.body)
    .then((user) => {
      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Böyle bir kullanıcı bulunmamaktadır" });
      delete user.password;
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

module.exports = {
  create,
  index,
  login,
};
