const sendData = async (url, data) => { //postData
  const resolve = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await resolve.json();
};

export { sendData };