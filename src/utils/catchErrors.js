const catchErrors = (err, appAuth) => {
  console.log(err);
  window.alert(err.response.data.message);
  if (err.response.status === 429) appAuth.logout();
};

export default catchErrors;
