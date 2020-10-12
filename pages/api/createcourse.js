import axios from "axios";

export default (req, res) => {
  const body = req.body;
  console.log(body)
  axios({
    method: "post",
    url: `${process.env.API_BASE_URL}/courses/create`,
    data: body
  })
    .then(function (response) {
      if (response.data.statusCode === 401) {
        res.redirect("/");
      }
      res.redirect(`/list/${req.body.id}`);
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        res.redirect("/");
      }
    });
};
