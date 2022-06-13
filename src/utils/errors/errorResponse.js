export const errorResponse = (res, code, message) => {
  return res.status(code).json({
    error: message,
  });
};
