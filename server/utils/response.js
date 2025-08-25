export function success(data) {
  return {
    code: 0,
    success: true,
    data,
  };
}

export function error(statusCode, message) {
  throw createError({
    statusCode,
    data: {
      code: 1,
      success: false,
      message,
    },
  });
}
