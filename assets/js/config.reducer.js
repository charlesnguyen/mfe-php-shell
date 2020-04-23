const UPDATE_TOKEN = "UPDATE_TOKEN";

const defaultState = {
  config: "Shell",
  user: "Carlito",
  token: ""
};

export const updateTokenAction = (token) => {
  return {
    type: UPDATE_TOKEN,
    payload: token
  }
}
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}
