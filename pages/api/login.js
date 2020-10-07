import axios from "axios";

export default (req, res) => {
  const body = req.query;
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
};
