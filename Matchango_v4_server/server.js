import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); // Ensure this line is executed at the top

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Access the API key from .env
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "HELLO FROM MATCHANGO",
  });
});

app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt); // Log the received prompt

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [],
      response_format: {
        type: "text",
      },
      prompt: `${prompt}`,
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("OpenAI response:", response.data.choices[0].text); // Log the response from OpenAI

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error("Error from OpenAI API:", error.message); // Log the error message
    res.status(500).send({ error: error.message });
  }
});

const PORT = 8020;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
