const rejectBadResponse = response => {
  console.log("reject?", response.ok, response.status);
  return response.ok ? response : Promise.reject(response);
};

export default rejectBadResponse;
