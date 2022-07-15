/**
 * @param response
 * @param object status, message, data
 * @returns object
 */
export function success(response, params) {
  const status = params.status ? params.status : 200;
  const message = params.message
    ? params.message
    : 'Request proccessed successfully.';
  const data = params.data ? params.data : {};
  response.status(201).json({
    success: true,
    status: status,
    message: message,
    data: data,
  });
}

/**
 * @param response
 * @param object status, message, data
 * @returns object
 */
export function error(response, params) {
  const status = params.status ? params.status : 400;
  const message = params.message
    ? params.message
    : 'There was an error with the request, please try again later.';
  const data = params.data ? params.data : {};
  response.status(status).json({
    success: false,
    status: status,
    message: message,
    data: data,
  });
}

export default {
  success,
  error,
};
