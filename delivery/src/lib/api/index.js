import axios from "axios";

const url = process.env.REACT_APP_Delivery_URL;

export const deliverDataParsing = async (name, number) => {
  try {
    const data = await axios.get(`${url}/${name}/tracks/${number}`);
    console.log(name, number)
      console.log(data)
    const parsing = {
      time: [],
      location: [],
      description: [],
      state: ""
    };

    const progress = data.data.progresses;
    for (const keys in progress) {
      parsing.time[keys] = progress[keys].time
      parsing.location[keys] = progress[keys].location.name
      parsing.description[keys] = progress[keys].description
    }
    parsing.state = data.data.state.text

    console.log(parsing)
    return parsing
  } catch (e) {
    console.log(e);
  }
};


export const deliveryInfo = async() => {
  try {
    const data = await axios.get(`${url}`)
    const parsing = {
      name: [],
      code: [],
    };

    for(const keys in data.data) {
      parsing.name[keys] = data.data[keys].name
      parsing.code[keys] = data.data[keys].id
    }

    return parsing
  } catch(e) {
    console.log(e)
  }
}