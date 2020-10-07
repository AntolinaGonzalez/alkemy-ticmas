import axios from "axios";
import { Form } from "react-bootstrap";

export default (req, res) => {
  console.log("ACA ESTOY")
  console.log(req.query)
   axios({
    method: "delete",
    url: `${process.env.API_BASE_URL}/contents/${req.query.delete}`,
  }).then(function (response){
    if (response.data.statusCode === 401) {
      res.redirect("/")
    }
    res.redirect(`/course/${req.query.course}`)
  })
  .catch(function (error) {
    if (error.response.status === 401) {
      res.redirect(`/course/${res.query.course}`)
    }
  })
  };