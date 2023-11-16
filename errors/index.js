const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-error");
const NotFoundError = require("./not-found");
const UnauthorizedError = require("./unauthenticated");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
};
