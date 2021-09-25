export const userTokenActions = (token) => (dispatch) => {
  dispatch({
    type: "USER_TOKEN",
    payload: {
      token,
    },
  });
};

export const removeUsertokenActions = () => (dispatch) => {
  dispatch({
    type: "REMOVE_USER_TOKEN",
  });
};
