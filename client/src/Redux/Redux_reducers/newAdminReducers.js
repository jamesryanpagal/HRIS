// ------------------------ NEW ADMIN REDUCERS ------------------------
// add new admin
export const newAdminReducers = (state = { newAdminList: [] }, action) => {
  switch (action.type) {
    case "NEW_ADMIN":
      const { newadmin } = action.payload;

      const newAdminExist = state.newAdminList.find(
        (a) => a._id === newadmin._id
      );

      if (!newAdminExist) {
        return {
          ...state,
          newAdminList: [...state.newAdminList, newadmin],
        };
      }

      return {
        ...state,
        newAdminList: [...state.newAdminList],
      };

    case "REMOVE_NEW_ADMIN":
      const { removeNewAdminId } = action.payload;

      return {
        ...state,
        newAdminList: state.newAdminList.filter(
          (a) => a._id !== removeNewAdminId
        ),
      };

    default:
      return state;
  }
};
