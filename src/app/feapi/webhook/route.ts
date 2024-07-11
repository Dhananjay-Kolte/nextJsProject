import axios from 'axios';

export async function POST(request: Request) {
    let webhookres = await axios
    .post(`https://api.apifuse.io/webhook/v2/notification/eyJvIjoiMSIsImEiOiJ3ZWJob29rIiwiYXYiOjEsInQiOiJ0cmlnZ2VyIG9uIHdlYmhvb2sgZXZlbnQiLCJ1IjoiaW50ZWdyYXRpb25zQG4zd2xhYi5jb20iLCJ3IjoiYmQ2NjY0MTYtOTkxNC00NDBjLTkxMTAtYjc4MmZiMDM4OGMxIn0=`, {
      request
    })
    .then((res) => {
      console.log('RESPONSE of WEBOOK:::', res);
    })
    .catch((err) => {
      console.log(err.response?.data);
      console.log(err);
      return err.response;
    });

  console.log("webhook Resposne:", webhookres);
}

