const { ObjectId } = require("mongodb");

const students = async (request, response, client) => {
    const db = client.db("MentoringTool");
    const collection = db.collection("mentis");
    const students = await collection.find().toArray();
    let studentsName = [];
    for (let i = 0; i < students.length; i++) {
        if (!students[i].assignedTo) {
            studentsName[i] = students[i].name + " " + students[i].surname;
        } else {
            const mentor = await db
                .collection("users")
                .findOne({ _id: new ObjectId(students[i].assignedTo) });
            studentsName[i] =
                students[i].name +
                " " +
                students[i].surname +
                " assigned to " +
                mentor.name +
                " " +
                mentor.surname +
                " " +
                students[i].assignedTo;
        }
    }
    response.json(studentsName);
};

module.exports = students;
