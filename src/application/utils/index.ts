const cleanPayload = (payload: any) => {
  if (!payload) {
    return;
  }
  const toStrip = ["password", "transactionPin", "ipAddress"];
  if (Array.isArray(payload)) {
    payload.forEach((item, index) => {
      payload[index] = cleanPayload(item);
    });
  } else {
    Object.keys(payload).forEach((key) => {
      if (toStrip.includes(key)) {
        delete payload[key];
        return;
      }
      if (typeof payload[key] == "object") {
        // recursion should be used here to take out the other nested objects but this would risk a stackoverflow error
        // so the solution is to be careful not to pass sensitive data or the user payload in a nested object
      }
    });
  }
  return payload;
};

export { cleanPayload };
