module.exports = mongoose => {
    let schema = mongoose.Schema({
        id: String,
        title: String,
        firstname: String,
        surname: String,
        dob: Date,
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        address1: String,
        address2: String,
        town: String,
        county: String,
        postcode: String,
        telephoneNumber: String,
        mobileNumber: String,
        email: {
            type: String,
            validate: {
                //https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
                validator: v =>/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v),
                message: props => `The email "${props.value}" is invalid! Please try again`
            }
        },
        deleted: {
            type: Boolean,
            default: false
        }
    });

    //Override toJSON to map object with id field
    schema.method("toJSON", function() {
        let { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("patient", schema);
}
