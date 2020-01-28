import { format } from "date-fns";

export const logger = {
  info(message, data) {
    console.log(`Log ${format(Date.now())}: ${message}`);
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  }
};
