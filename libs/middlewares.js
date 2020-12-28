import bodyparser from "body-parser";
module.exports = (app) => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
};
