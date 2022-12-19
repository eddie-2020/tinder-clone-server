import express from "express";
import mongoose from "mongoose";
import Cards from "./models/dbCards.model.js";
import Cors from "cors";
import dotenv from "dotenv";

// App Config
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
const URI = process.env.CONNECTION_URL;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connected Successfully");
});

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("HELLO CLEVER PROGRAMMERS!!!");
});

// app.post('/upload', (req, res) => {

// })

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));

export default app;
// export default app = functions.https.onRequest(app);
