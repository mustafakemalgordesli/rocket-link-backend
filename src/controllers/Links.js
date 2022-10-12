const httpStatus = require("http-status");
const Link = require("../models/Link");
const User = require("../models/User");

const create = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return next({
          statusCode: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      }
      req.body.user_id = user._id;
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
          console.log(err);
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

const update = (req, res, next) => {
  Link.updateOne(
    {
      _id: req.params.id,
      isDeleted: false,
      isStatus: true,
    },
    { ...req.body }
  )
    .then((updatedLink) => {
      delete updatedLink.isDeleted;
      return res.status(httpStatus.OK).json({
        success: true,
        data: {
          ...updatedLink,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      return next({
        error,
      });
    });
};

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

const getAllByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username, isDeleted: false })
    .then((user) => {
      if (!user)
        return next({
          statusCode: httpStatus.NOT_FOUND,
          message: "Username not found",
        });

      Link.find({ user_id: user._id, isDeleted: false, isStatus: true })
        .select("_id title link")
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
  getAllByUsername,
};
