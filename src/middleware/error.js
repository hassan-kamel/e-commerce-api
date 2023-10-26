import ErrorApi from '../utils/error.js';
const globalError = (err, req, res, next) => {
  //   console.log('err: ', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  //   const error = { ...err, status, statusCode };
  //   console.log('error: ', error);
  if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
  if (err.name === 'TokenExpiredError') err = handleJwtExpired();
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

const handleJwtInvalidSignature = () => new ErrorApi('Invalid token, please login again..', 401);

const handleJwtExpired = () => new ErrorApi('Expired token, please login again..', 401);

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalError;
