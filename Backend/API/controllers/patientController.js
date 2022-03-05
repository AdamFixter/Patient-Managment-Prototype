const db = require("../models");
const Patient = db.Patient;

const validObject = id => id.match(/^[0-9a-fA-F]{24}$/);

module.exports = {
    getAll: (req, res) => {
        Patient.find({})
            .then(patients => res.send(patients || {}))
            .catch(err => res.send(500).send({
                message: err.message
            }));
    },
    getById: (req, res) => {
        let id = req.params.id;

        if (!validObject(id)) {
            return res.status(404).send({
                message: `Couldn't find the patient ${id}`
            });
        }

        Patient.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Couldn't find the patient ${id}`
                    });
                } else {
                    res.send(data);
                }
            })
            .catch(err => res.status(500).send({
                message: err.message
            }));
    },
    create: (req, res) => {
        let props = [
            "title",
            "firstname",
            "surname",
            "dob",
            "gender",
            "address1",
            "address2",
            "town",
            "county",
            "postcode",
            "telephoneNumber",
            "mobileNumber",
            "email"
        ]

        let validProps = props.every(prop => {
            let hasProp = req.body.hasOwnProperty(prop);
            if (!hasProp) {
                res.status(400).send({
                    message: `Invalid body. Couldn't find "${prop}" property!`
                });
            }
            return hasProp;
        });
        if (!validProps) return;

        let patient = new Patient({});
        props.forEach(prop => patient[prop] = req.body[prop]);

        patient.save(patient)
            .then(data => res.send(data))
            .catch(err => res.status(500).send({
                message: err.message
            }));
    },
    update: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                message: "Request body cannot be empty!"
            });
        }

        let id = req.params.id;
        if (!validObject(id)) {
            return res.status(404).send({
                message: `Patient ${id} couldn't be found`
            })
        }
        Patient.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Patient ${id} couldn't be found`
                    })
                } else {
                    res.send({
                        message: `Successfully updated patient ${id}`
                    });
                }
            })
            .catch(err => res.status(500).send({
                message: err.message || `An unknown error happened while updating patient ${id}`
            }));
    },
    delete: (req, res) => {
        let id = req.params.id;

        if (!validObject(id)) {
            return res.status(404).send({
                message: `Patient ${id} couldn't be found!`
            });
        }
        Patient.findByIdAndRemove(id)
            .then(data => {
                if(!data) {
                    return res.status(404).send(`Patient ${id} couldn't be found!`)
                }

                res.send({
                    message: `Successfully deleted patient ${id}`
                });
            }).catch(err => res.status(500).send({
                message: `There was a problem when trying to delete patient ${id}`,
                error: err.message
            }));
    },
    deleteAll: (req, res) => {
        Patient.deleteMany({})
            .then(data => res.send({
                message: `${data.deletedCount} patient(s) were deleted successfully!`
            })).catch(err => res.status(500).send({
                message: err.message || "An unknown error happened while removing all patients!"
            }))
    }
}