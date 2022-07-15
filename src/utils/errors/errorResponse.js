export const errorResponse = (res, code, message) =>
  res.status(code).json({
    error: message,
  });
