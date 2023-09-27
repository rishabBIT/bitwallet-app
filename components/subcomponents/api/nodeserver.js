import AsyncStorage from "@react-native-async-storage/async-storage";
API_URL = "http://192.168.1.5:3000/api/";

export const getkeys = async () => {
  const endpoint = "getkeys";
  const url = API_URL + endpoint;
  const result = { status: "failed" };
  try {
    const response = await fetch(url).then((res) => res.json());
    result.status = "success";
    result.data = response;
  } catch (e) {
    console.log(e);
  }
  return result;
};
export const getbalance = async () => {
  const publicKey = await AsyncStorage.getItem("publicKey");
  const privateKey = await AsyncStorage.getItem("secretKey");
  console.log(privateKey);
  const endpoint = "getbalance";
  const url = API_URL + endpoint;
  const result = { status: "failed" };
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: publicKey,
        networkType: "testnet",
        privateKey,
      }),
    };
    const response = await fetch(url, requestOptions).then((res) => res.json());
    console.log(response);
    result.status = "success";
    result.data = response;
  } catch (e) {
    console.log(e);
  }
  return result;
};
