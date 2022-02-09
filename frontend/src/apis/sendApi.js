// eslint-disable-next-line no-unused-vars
import api from "./common";

export default {
  startEndDate: () => {
    return api.get("/startend");
  },
  getChartData: (req) => {
    return api.post("/getChartData", req);
  },
};