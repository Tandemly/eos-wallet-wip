const rejectBadResponse = response => (
  response.ok ? response : Promise.reject(response)
);

export default rejectBadResponse;
