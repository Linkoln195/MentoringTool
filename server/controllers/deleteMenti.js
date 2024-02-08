const newMentor = async (request, response, client) => {
    const db = client.db("MentoringTool");
    const collection = db.collection("mentis");
    console.log(request.body);
    await collection.findOneAndUpdate(
        {
            name: request.body.item.split(" ")[0],
            surname: request.body.item.split(" ")[1],
        },
        { $set: { assignedTo: "" } }
    );
};

module.exports = newMentor;
