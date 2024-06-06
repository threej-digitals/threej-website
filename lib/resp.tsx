const response = (
  message = "unknown error occurred",
  okay = false,
  rows: any[] = []
) => {
  return Response.json({
    message: message,
    ok: okay,
    data: rows,
  });
};

export default response;
