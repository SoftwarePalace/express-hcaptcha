import hcaptcha from "hcaptcha";
import express from "express";

// validate takes an hCaptcha secret and returns
// an express middleware function
export const validate =
  (secret: string) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // get token from the body
    // requires the body parser JSON middleware
    // on the app that uses this middleware
    const token = req.body && req.body.token;

    if (!token) {
      res.status(400).json({ msg: "No token was privded in the body!" });
      return;
    }

    // verify the hcaptcha and continue on success
    return hcaptcha
      .verify(secret, token)
      .then((data) => {
        res.locals.hcaptcha = data;
        if (data.success) {
          return next();
        }
        res.status(400).json({ msg: data["error-codes"] });
        return;
      })
      .catch(next);
  };
