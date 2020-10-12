import axios from "axios";

export default (req, res) => {
  const body = req.query;
  console.log('el body',body)
  axios({
    method: "get",
    url: `${process.env.API_BASE_URL}/users`,
    data: body,
  })
    .then(function (response) {
      console.log('response login',response.data);
      res.redirect(`../list/${response.data._id}`);
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        res.redirect("../error");
      }
    });
};
