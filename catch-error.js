'use strict';
const { BadRequestError, NotFoundError } = require('./error');

function catchError(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (err) {
      if (err instanceof BadRequestError) {
        return res.status(400).json({ message: err.message });
      }
      if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
      }

      return res.status(500).json({ message: err.message });
    }
  };
}

module.exports = catchError;