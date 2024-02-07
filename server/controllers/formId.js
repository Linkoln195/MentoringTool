const { ObjectId } = require("mongodb");

const formId = async (request, response, client) => {
    console.log(request.body);
    const db = client.db("MentoringTool");
    const formCollection = db.collection("forms");
    const mentiCollection = db.collection("mentis");
    const menti = await mentiCollection
        .find({
            name: request.body.item.split(" ")[0],
            surname: request.body.item.split(" ")[1],
        })
        .toArray();

    const formIdData = menti[0].form;

    const formData = await formCollection
        .find({ _id: new ObjectId(formIdData) })
        .toArray();
    console.log(formData);
    response.json(formData[0]);
};

module.exports = formId;
