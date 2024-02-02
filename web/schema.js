const jsonSchema = require("./public/json-schema.json");

export default function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(jsonSchema);
}