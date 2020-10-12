import axios from "axios";
import { setToken } from "./Helpers/auth-Helpers";

export default async (req, res) => {
  const body = req.query;
  const { data } = await axios.post(`${process.env.API_BASE_URL}/users/login`, {
    email: body.email,
    password: body.password,
  });
  setToken(data.accessToken)
  res.redirect("../course/list")
  // .then(function (response) {
  //   //setToken(response.data.accessToken)
  //   axios.defaults.headers.common["Authorization"] =
  //     response.data.accessToken;
  //     res.redirect("../course/list");
  // })
  // .catch(function (error) {
  //   if (error.response.status === 401) {
  //     res.redirect("../error");
  //   }
  // });
};
