import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateURLs = async () => {
  try {
    const response = await fetch(
      "https://navrajbit.github.io/walletconfig.json"
    );
    const data = await response.json();
    AsyncStorage.setItem("cert-backend", data["cert-backend"]);
    AsyncStorage.setItem(
      "cert-urls",
      JSON.stringify({ certURLs: data["cert-urls"] })
    );
    AsyncStorage.setItem("node-backend", data["node-backend"]);
  } catch (e) {
    console.error("error here :", e);
  }
};

export const getkeys = async () => {
  const API_URL = await AsyncStorage.getItem("node-backend");
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
  const API_URL = await AsyncStorage.getItem("node-backend");
  const publicKey = await AsyncStorage.getItem("publicKey");
  const privateKey = await AsyncStorage.getItem("secretKey");
  const selectednetwork = await AsyncStorage.getItem("network");
  const networkType = JSON.parse(selectednetwork).networkType;
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
        networkType: networkType,
        privateKey,
      }),
    };
    const response = await fetch(url, requestOptions).then((res) => res.json());
    result.status = "success";
    result.data = response;
  } catch (e) {
    console.log(e);
  }
  return result;
};
export const sendNear = async (address, amount) => {
  const API_URL = await AsyncStorage.getItem("node-backend");
  const publicKey = await AsyncStorage.getItem("publicKey");
  const privateKey = await AsyncStorage.getItem("secretKey");
  const selectednetwork = await AsyncStorage.getItem("network");
  const networkType = JSON.parse(selectednetwork).networkType;
  const endpoint = "sendNear";
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
        networkType: networkType,
        privateKey: privateKey,
        address: address,
        amount: amount,
      }),
    };
    const response = await fetch(url, requestOptions).then((res) => res.json());
    result.status = "success";
    result.data = response;
  } catch (e) {
    console.log(e);
  }
  return result;
};
export const importkeys = async (phrase) => {
  const API_URL = await AsyncStorage.getItem("node-backend");
  const endpoint = "importkeys";
  const url = API_URL + endpoint;
  const result = { status: "failed" };
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seedPhrase: phrase,
      }),
    };
    const response = await fetch(url, requestOptions).then((res) => res.json());
    result.status = "success";
    result.data = response;
  } catch (e) {
    console.log(e);
  }
  return result;
};
export const getCertificates = async () => {
  console.log("getting certs");
  const API_URL = await AsyncStorage.getItem("cert-backend");
  const publicKey = await AsyncStorage.getItem("publicKey");
  const endpoint = "getCertificate";
  const url = `${API_URL}certificate/${endpoint}/?wallet=${publicKey}`;
  // const url =
  //   "http://192.168.1.6:8000/api/v2/certificate/getCertificate/?wallet=" +
  //   publicKey;
  console.log(url);
  const result = { status: "failed" };
  try {
    const response = await fetch(url).then((res) => res.json());
    result.status = "success";
    result.data = response;
  } catch (e) {
    console.log("Cert Error", e);
  }
  return result;
};
