import axios from "axios";

export default (req, res) => {
    console.log("REQ Query")
    console.log(req.query)
    console.log("REQQQQQQQ Body")
    console.log(req.body)
   
    axios({
        method: "put",
        url: `${process.env.API_BASE_URL}/contents/${req.query.edit}`,
        data: {
            title: req.query.title,
            description: req.query.description,
            media: [
                {
                    title: req.query.mediaTitle,
                    description: req.query.mediaDescription,
                    url: req.query.image
                },
                {
                    title: req.query.urlTitle,
                    description: req.query.urlDescription,
                    url: req.query.url
                }
            ]
        }
    })
    .then(function (response) {
        if (response.data.statusCode === 401) {
        res.redirect("/");
        }
        res.redirect(`/course/${req.query.course_id}`)
    })
    .catch(function (error) {
        if (error.response.status === 401) {
        res.redirect(`/course/${req.query.course_id}`);
        }
    })
}
