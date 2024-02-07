const express = require("express");
const cors = require("cors");
const login = require("./controllers/login");
const students = require("./controllers/students");
const newMentor = require("./controllers/newMentor");
const formId = require("./controllers/formId");
const formValue = require("./controllers/formValue");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

const MongoClient = require("mongodb").MongoClient;

const url =
    "mongodb+srv://admin:admin@cluster0.ftjs83x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect().then(console.log("DB is OK"));
    } catch (err) {
        console.log(err);
    }
}
run().catch(console.error);

app.post("/login", (request, response) => {
    login(request, response, client);
});

app.post("/new-mentor", (request, response) => {
    newMentor(request, response, client);
});

app.get("/students-info", (request, response) => {
    students(request, response, client);
});

app.post("/form-id", (request, response) => {
    formId(request, response, client);
});

app.post("/form-value", (request, response) => {
    formValue(request, response, client);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
