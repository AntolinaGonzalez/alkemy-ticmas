import axios from "axios";
/* import FormData from "form-data"; */

export default (req, res) => {
    const body = req.body
    
    axios({
        method: "post",
        url: `${process.env.API_BASE_URL}/seccions/${req.query.create}/content`,
        data: {
            title: body.title,
            description: body.description,
            media: [
                {
                    title: body.mediaTitle,
                    description: body.mediaDescription,
                    url: body.image
                },
                {
                    title: body.urlTitle,
                    description: body.urlDescription,
                    url: body.url
                }
            ]
        }
    })
    .then(function (response) {
        if (response.data.statusCode === 401) {
        res.redirect(`/course/${req.query.course}`);
        }
        res.redirect(`/course/${req.query.course}`)
    })
    .catch(function (error) {
        if (error.response.status === 401) {
        res.redirect(`/course/${req.query.course}`);
        }
    })
}
