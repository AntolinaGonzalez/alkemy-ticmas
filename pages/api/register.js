import axios from "axios";

export default (req, res) => {
  const body = req.body;
  axios({
    method: "post",
    url: `${process.env.API_BASE_URL}/users`,
    data: body,
  })
    .then(function (response) {
      axios({
        method: "post",
        url: `${process.env.API_BASE_URL}/users/login`,
        data: body,
      })
        .then(function (response) {
          axios.defaults.headers.common["Authorization"] =
            response.data.accessToken;
            res.redirect("../course/list");
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            res.redirect("../error");
          }
        });
    })
    .catch(function (error) {
      if (error.response.data.statusCode === 409) {
        res.redirect("../registerError");
      }
    });
};
