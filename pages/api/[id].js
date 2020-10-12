import axios from "axios";
import { Form } from "react-bootstrap";

export default (req, res) => {
  axios({
    method: "delete",
    url: `${process.env.API_BASE_URL}/courses/${req.query.id}`,
  }).then(function (response) {
    res.redirect(`../list/${req.query.id}`);
  });
};
