module.exports = app => {
    const patient = require("../controllers/patientController");

    app.get("/", (req, res) => res.status(200).send("OK!"))
    app.post("/patient", patient.create);
    app.get("/patient", patient.getAll);
    app.get("/patient/:id", patient.getById);
    app.put("/patient/:id", patient.update);
    app.delete("/patient/:id", patient.delete);
    app.delete("/patient", patient.deleteAll);
}
