import axios from "axios";

export default (req, res) => {
  const body = req.body;

  axios({
    method: "post",
    url: `${process.env.API_BASE_URL}/courses/create`,
    data: {course: body},
    headers: {
      Authorization: `Bearer ` + axios.defaults.headers.common.Authorization,
    },
  })
    .then(function (response) {
      if (response.data.statusCode === 401) {
        res.redirect("/");
      }
      res.redirect("/course/list");
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        res.redirect("/");
      }
    });
};
