const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = "fca5b46888534a2abf05d1f1877334e1383e95d3c4e31c993053ac55080fd092";
const iv = "629edbcc19a5e0a6caa24aa646ed14d5";
const path = require("path");

exports.encrypt = (text) => {
    try {
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    } catch (error) {
        console.log(error);
    }

};

exports.decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(Buffer.from(encrypted, "hex"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};



exports.secret = {
    JWT_TOKEN_SECRET: "68b40a2d-0cea-49e8-8094-9233282719ca",
    UPLOAD_DIR: path.resolve("../../data/"),
}