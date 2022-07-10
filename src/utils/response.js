const notFoundResponse = async (res, message) =>
  res.status(404).json({ status: 404, data: { message } });

const successResponse = async (res, code, message, data = null) =>
  res.status(code).json({ status: code, data: { message, data } });

const createdResponse = async (res, message) =>
  res.status(201).json({ status: 201, data: { message } });

export { notFoundResponse, successResponse, createdResponse };
