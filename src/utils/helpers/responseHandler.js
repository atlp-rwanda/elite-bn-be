const successResponse = async (res, code, message, data = null) =>
  res.status(code).json({ status: code, data: { message, data } });
export { successResponse };
