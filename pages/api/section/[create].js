import axios from "axios";

export default (req, res) => {
    const body = req.body;
    axios({
        method: "post",
        url: `${process.env.API_BASE_URL}/courses/${req.query.create}/section`,
        data: {
            title: body.title,
            description: body.description,
            content: body.content
        }
    })
    .then(function (response) {
        if (response.data.statusCode === 401) {
        res.redirect("/");
        }
        res.redirect(`/course/${req.query.create}`)
    })
    .catch(function (error) {
        if (error.response.status === 401) {
        res.redirect("/");
        }
    })
}
