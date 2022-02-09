import Sensor from "../models/Sensor.js";
import moment from "moment";

export const home = async (req, res) => {
  const sensors = await Sensor.findOne().sort({ _id: -1 }).limit(1);

  const dataObject = {
    temp: sensors.temp,
    humidity: sensors.humidity,
    cdc: sensors.cdc,
    water: sensors.water,
  };

  return res.send(dataObject);
};

export const data = async (req, res) => {
  let sendArray = [];
  const datas = await Sensor.find().sort({ createdAt: "desc" });

  datas.forEach((element) => {
    let dataArray = [];
    dataArray.push(element.createdAt);
    dataArray.push(element.temp);
    dataArray.push(element.humidity);
    dataArray.push(element.cdc);
    dataArray.push(element.water);
    sendArray.push(dataArray);
  });

  const dataObject = { sendArray };

  return res.send(dataObject);
};

export const startend = async (req, res) => {
  const firstData = await Sensor.findOne();
  const lastData = await Sensor.find().sort({ _id: -1 }).limit(1);

  const firstData_createdAt = firstData.createdAt;
  const lastData_createdAt = lastData[0].createdAt;

  const startendObject = {
    firstData_createdAt,
    lastData_createdAt,
  };

  res.send(startendObject);
};

export const getChartData = async (req, res) => {
  let sendArray = [];

  const { startDate, endDate } = req.body;

  if (req.body) {
    const datas = await Sensor.find({
      createdAt: { $gt: startDate, $lt: endDate },
    });

    datas.forEach((element) => {
      let dataArray = [];

      dataArray.push(
        element.createdAt
          .toLocaleDateString()
          .replaceAll(".", "-")
          .replaceAll(" ", "")
          .slice(0, -1)
      );
      dataArray.push(element.temp);
      dataArray.push(element.humidity);
      dataArray.push(element.cdc);
      dataArray.push(element.water);
      sendArray.push(dataArray);
    });

    const dataObject = { sendArray };

    console.log(dataObject);
    return res.send(dataObject);
  } else {
    return res.send("No body!");
  }
};
