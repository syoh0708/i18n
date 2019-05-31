'use strict';
const catchError = require('../catch-error');

function keyController(app) {
  return keyService => {
    app.get('/keys',
      catchError(async (req, res) => {
        const { name } = req.query;

        return res.json({
          keys: await keyService.get(name)
        });
      })
    );

    app.post('/keys',
      catchError(async (req, res) => {
        const { name } = req.body;
        const key = await keyService.add(name);

        return res.json({
          key,
        });
      }),
    );

    app.put('/keys/:keyId',
      catchError(async (req, res) => {
        const { name } = req.body;
        const { keyId } = req.params;
        const key = await keyService.edit(keyId, name);

        return res.json({
          key,
        });
      }),
    );
  };
}

module.exports = keyController;