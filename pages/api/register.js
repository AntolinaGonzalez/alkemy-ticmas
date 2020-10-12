import axios from "axios";

export default (req, res) => {
  const body = req.body;
  axios({
    method: "post",
    url: `${process.env.API_BASE_URL}/users`,
    data: body,
  })
    .then(function (response) {
      res.redirect(`../list/${response.data.user._id}`);
    })
    .catch(function (error) {
      if (error.response.data.statusCode === 409) {
        res.redirect("../registerError");
      }
    });
};
