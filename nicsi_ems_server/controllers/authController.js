const authModel = require("../models/authModel");

exports.login = async (req, res) => {
    try {
        const loginUser = await authModel.loginUser({ data: req.body });
        res.send({
            status: true,
            message: "You are successfully login.",
            data: loginUser,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.registration = async (req, res) => {
    try {
        const addNewUser = await authModel.addNewUser({ data: req.body });
        res.send({
            status: true,
            message: "You are successfully registered.",
            data: addNewUser,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.getUserData = async (req, res) => {
    const userDetails = await authModel.userDetails({ email: req.user?.email });
    if (!userDetails)
        return res.status(403).json({ message: "Unauthenticated" });
    const _user = {
        id: userDetails?.uid,
        email: userDetails?.email,
        name: userDetails?.name,
        type: userDetails?.type,
    };
    return res.json(_user);
};
