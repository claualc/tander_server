// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser'

import { Expo, ExpoPushMessage } from 'expo-server-sdk';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended: true}))

let expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: false // this can be set to true in order to use the FCM v1 API
});

console.log(".:: Settin expo access token", process.env.EXPO_ACCESS_TOKEN)


app.post("/push_notification", async (req: Request, res: Response) => {
  console.log(req.body, req.params)

  if (!Expo.isExpoPushToken(req.body.token)) {
    console.log("is not a valdi push token")
  } else 
    console.log("is a vaid push token")

  let msg:ExpoPushMessage = req.body
  try {
    await expo.sendPushNotificationsAsync([msg]);
  } catch(e) {
    console.log(e)
  }
  res.send(200);
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});