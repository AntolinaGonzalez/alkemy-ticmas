import axios from "axios";

export default (req, res) => {
  let body = req.query;
  axios({
    method: "put",
    url: `${process.env.API_BASE_URL}/seccions/${req.query.id}`,
    data: {
      title: body.title,
      description: body.description,
      content: body.content,
    },
  }).then(function (response) {
    res.redirect(`../../../course/${req.query.course}`);
  });
};
