const login = async (request, response, client) => {
    const db = client.db("MentoringTool");
    const collection = db.collection("users");
    console.log(request.body);
    const user = await collection.findOne(request.body);
    if (!user) {
        response.status(400).json({ message: "Wrong login or password" });
    } else {
        let id = user._id.toString();
        response.json(id);
    }
};

module.exports = login;
