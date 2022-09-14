const httpStatus = require("http-status");
const Link = require("../models/Link");
const User = require("../models/User");

const create = (req, res, next) => {
  User.findOne({ _id: req.body.user_id })
    .then((user) => {
      if (!user) {
        return next({
          statusCode: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      }
      const link = new Link(req.body);
      link
        .save()
        .then((link) => {
          console.log(link);
          link.isDeleted = undefined;
          return res.status(httpStatus.CREATED).json({
            data: link,
            success: true,
            message: "Link created",
          });
        })
        .catch((err) => {
          return next({
            statusCode: httpStatus.BAD_REQUEST,
            message: "Link not created",
          });
        });
    })
    .catch((err) => {
      return next({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });
    });
};

const getById = (req, res, next) => {
  Link.findOne({ _id: req.params.id, isDeleted: false })
    .then((link) => {
      if (!link)
        return next({
          statusCode: httpStatus.NOT_FOUND,
          message: "Link not found",
        });
      return res.status(httpStatus.OK).json({
        success: true,
        data: link,
      });
    })
    .catch((err) => {
      return next({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });
    });
};

const getAllByUserId = (req, res, next) => {
  console.log(req.user);
  Link.find({ user_id: req.user._id, isDeleted: false })
    .then((links) => {
      if (!links)
        return next({
          statusCode: httpStatus.BAD_REQUEST,
          message: "Error",
        });
      return res.status(httpStatus.OK).json({
        data: links,
        success: true,
      });
    })
    .catch((err) => {
      return next({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });
    });
};

const update = (req, res, next) => {};

const remove = (req, res, next) => {
  Link.findOne({ _id: req.params.id, isDeleted: false })
    .then((link) => {
      if (!link) {
        return next({
          statusCode: httpStatus.NOT_FOUND,
          message: "Link not found",
        });
      }
      link.isDeleted = true;
      link
        .save()
        .then((link) => {
          console.log(link);
          return res.status(httpStatus.OK).json({
            success: true,
          });
        })
        .catch((err) => {
          return next({
            statusCode: httpStatus.METHOD_NOT_ALLOWED,
            message: "Link not deleted",
          });
        });
    })
    .catch((err) => {
      return next({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });
    });
};

module.exports = {
  create,
  getById,
  getAllByUserId,
  update,
  remove,
};
