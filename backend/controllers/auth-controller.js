const express = require("express");
const authLogic = require("../bll/auth-logic");
const { getError } = require("../helpers/errors-helper");
const router = express.Router();


// Register:
router.post("/register", async (request, response) => {
    try {
        const addedUser = await authLogic.registerAsync(request.body);
        response.status(201).json(addedUser);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});

// Login:
router.post("/login", async (request, response) => {
    try {
        const loggedInUser = await authLogic.loginAsync(request.body);
        if (!loggedInUser)
            return response.status(401).send("Incorrect username or password");
        response.json(loggedInUser);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});

module.exports = router;
