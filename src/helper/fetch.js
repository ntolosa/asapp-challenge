import { API_STATUS } from "../constants/constants";

const get = async (url) => {
  let status;
  let data;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    data = await response.json();
    status = API_STATUS.SUCCESS;
  } catch(e) {
    status = API_STATUS.ERROR;
  }
  return {status, data};
}

const patch = async (url, body) => {
  let status;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    if (!response.ok) {
      status = API_STATUS.ERROR;
    } else {
      status = API_STATUS.SUCCESS;
    }
  } catch(e) {
    status = API_STATUS.ERROR;
  }
  return {status};
};

export {get, patch};
