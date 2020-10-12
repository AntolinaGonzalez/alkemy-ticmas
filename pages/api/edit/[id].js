import axios from "axios";

export default (req, res) => {
    const body = req.query
   axios({
    method: "put",
    url: `${process.env.API_BASE_URL}/courses/${req.query.id}`,
    data: {
      title: body.title,
      description: body.description
    }
  }).then(function (response){
    
    res.redirect(`/list/${req.query.ct}`)
  })
  };