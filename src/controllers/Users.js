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
      }
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next({
            statusCode: httpStatus.BAD_REQUEST,
            message: "User not created",
          });
        }
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) {
            return next({
              statusCode: httpStatus.BAD_REQUEST,
              message: "User not created",
            });
          }
          const user = new User({
            email: req.body.email,
            password: hash,
            full_name: req.body.full_name,
            username: req.body.username,
          });
          user.save().then((result) => {
            result.password = undefined;
            result.isEmailVerified = undefined;
            result.isDeleted = undefined;
            const token = encryptText(
              generateAccessToken({
                _id: result._id,
                email: result.email,
                username: result.username,
                views_count: result.views_count,
              })
            );

            return res.status(httpStatus.CREATED).json({
              data: result,
              message: "User created",
              token: token,
            });
          });
        });
      });
    })
    .catch((err) => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    });
};

const index = (req, res) => {
  User.find({
    isDeleted: false,
    isBlocked: false,
  })
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const login = (req, res, next) => {
  var query = {
    isDeleted: false,
    isBlocked: false,
  };
  if (req.body?.username) query.username = req.body.username;
  if (req.body?.email) query.email = req.body.email;
  User.findOne(query)
    .then((user) => {
      if (!user)
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err)
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
          });
        if (!result)
          return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Password is wrong",
          });

        user.password = undefined;
        user.isEmailVerified = undefined;
        user.isDeleted = undefined;
        const token = encryptText(
          generateAccessToken({
            _id: user._id,
            email: user.email,
            username: user.username,
            views_count: user.views_count,
          })
        );
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            ...user.toObject(),
          },
          token,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

const changeProfilePic = (req, res, next) => {
  console.log(req.user);
  User.findOne({ _id: req.user._id, isDeleted: false, isBlocked: false })
    .then((user) => {
      user.profile_picture = "images/" + req.file.filename;
      user
        .save()
        .then((user) => {
          return res.status(httpStatus.OK).json({
            success: true,
            message: "Profile picture is changed",
            data: {
              profile_picture: user.profile_picture,
            },
          });
        })
        .catch((err) => {
          return next({
            httpStatus: httpStatus.BAD_REQUEST,
            message: "Profile picture not changed",
          });
        });
    })
    .catch((err) => {
      return next({
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found",
      });
    });
};

module.exports = {
  create,
  index,
  login,
  changeProfilePic,
};
