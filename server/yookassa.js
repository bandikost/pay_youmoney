import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";

dotenv.config();
const router = express.Router();

router.post("/create-payment", async (req, res) => { 
    try {
      const { item } = req.body;

      const paymentData = {
          amount: { value: item, currency: "RUB" },
          confirmation: { type: "redirect", return_url: process.env.CLIENT_URL + "/success" },
          capture: true,
          description: "Покупка",
      };

    const auth = Buffer.from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET}`).toString("base64");

    const response = await axios.post(
      "https://api.yookassa.ru/v3/payments",
      paymentData,
      {
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json",
          "Idempotence-Key": uuidv4(), // уникальный ключ для каждого запроса
        },
      }
    );

    res.json({ url: response.data.confirmation.confirmation_url });

    }

    catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Не удалось создать платеж" });
    }
})

export default router;