export const successResponse = (res, code, data) => {
  return res.status(code).json({ data });
};