const sendJsonResponse = (httpStatus, responseObject) => res => {
  res.status(httpStatus)
  res.send(JSON.stringify(responseObject))
}

module.exports = sendJsonResponse;
