const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    name: String,
    description: String,
    contactInfo: {
        tel: [Number],
        url: [String],
        email: [String],
        address: {
            street: String,
            houseNumber: String,
            area: String
        }
    } ,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Service = model("Service", serviceSchema)
module.exports = Service;
