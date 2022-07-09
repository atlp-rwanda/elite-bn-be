// eslint-disable-no
const notFoundResponse = async (res, message, data = null) => 
  res.status(404).json({ status: 404, data: { message, data } });

const validResponse = async (res, code, message, data = null) => 
  res.status(code).json({ status: code, data: { message, data } });

const feedbackResponse = async (res, message, data = null) => 
  res.status(201).json({ status: 201, data: { message, data } });

const semanticError = (res, message, data = null)  => {
    res.status(422).json({ status: 201, data: { message, data } });
  };
export { notFoundResponse, validResponse, feedbackResponse, semanticError };
