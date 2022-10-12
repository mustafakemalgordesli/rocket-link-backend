const User = require("../models/User");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

const { generateAccessToken, encryptText } = require("../scripts/utils/helper");

const create = (req, res, next) => {
  User.find({
    $or: [
      { email: req.body.email, isDeleted: false },
      { username: req.body.username, isDeleted: false },
    ],
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
      bcrypt.genSalt(12, function (err, salt) {
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
          req.body.password = hash;
          const user = new User(req.body);
          user.save().then((result) => {
            result.password = undefined;
            result.isDeleted = undefined;
            result.isEmailVerified = undefined;
            const token = encryptText(
              generateAccessToken({
                user: {
                  ...result.toObject(),
                },
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

const login = (req, res, next) => {
  const query = { ...req.body };
  delete query.password;
  User.findOne({ ...query, isDeleted: false })
    .then((user) => {
      if (!user)
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
          });
        }
        if (!result)
          return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Password is wrong",
          });

        user.password = undefined;
        user.isDeleted = undefined;
        user.isEmailVerified = undefined;
        const token = encryptText(
          generateAccessToken({
            ...user.toObject(),
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
  User.findOne({ _id: req.user._id, isDeleted: false })
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

const updateViewsCounts = (req, res, next) => {
  User.findOne({
    username: req.body.username,
    isDeleted: false,
  })
    .then((user) => {
      if (!user)
        return next({
          statusCode: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      user.views_count = user.views_count + 1;
      user
        .save()
        .then((user) => {
          return res.status(200).json({
            success: true,
          });
        })
        .catch((error) => {
          return next({
            error,
          });
        });
    })
    .catch((error) => {
      return next({
        error,
      });
    });
};

const getUserByToken = (req, res, next) => {
  console.log(req.user._id);
  User.findOne({ _id: req.user._id, isDeleted: false })
    .then((user) => {
      if (!user)
        return next({
          statusCode: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      delete user.password;
      delete user.isDeleted;

      return res.status(httpStatus.OK).json({
        success: true,
        data: user,
      });
    })
    .catch((error) =>
      next({
        error,
      })
    );
};

module.exports = {
  create,
  login,
  changeProfilePic,
  updateViewsCounts,
  getUserByToken,
};
