const newMentor = async (request, response, client) => {
    const db = client.db("MentoringTool");
    const collection = db.collection("mentis");
    console.log(request.body);
    await collection.findOneAndUpdate(
        {
            name: request.body.name.split(" ")[0],
            surname: request.body.name.split(" ")[1],
        },
        { $set: { assignedTo: request.body.id } }
    );
};

module.exports = newMentor;
