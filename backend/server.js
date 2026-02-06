const db = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("./middleware/auth");


const SECRET = "supersecretkey";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("NANDFLIX API is running 🎬");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword],
            function(err) {

                if (err) {
                    return res.status(400).json({
                        error: "User already exists"
                    });
                }

                res.json({
                    message: "User created successfully 🎉"
                });

            }
        );

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, user) => {

            if (err) {
                return res.status(500).json({ error: "Server error" });
            }

            if (!user) {
                return res.status(401).json({
                    error: "Invalid credentials"
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res.status(401).json({
                    error: "Invalid credentials"
                });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET,
                { expiresIn: "2h" }
            );

            res.json({
                message: "Login successful 🎉",
                token
            });

        }
    );
});

app.get("/home", auth, (req, res) => {

    res.json({
        message: `Welcome to NANDFLIX, ${req.user.email} 🎬`
    });

});

