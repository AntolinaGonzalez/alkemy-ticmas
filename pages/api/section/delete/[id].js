import axios from "axios";

export default (req, res) => {
  axios({
    method: "delete",
    url: `${process.env.API_BASE_URL}/seccions/${req.query.id}`,
  }).then(function (response) {
    res.redirect(`../../../course/${req.query.course}`);
  });
};
