import axios from "axios";
import {
  USER_LODED,
  USER_LODING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCESS,
  LOGIN_SUCESS,
  REGISTER_FAIL,
  REGISTER_SUCESS,
} from "../actions/types";
import { returnErrors, clearErrors } from "./errorActions";

//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LODING });

  try {
    const res = await axios.get("/api/auth/user", tokenConfig(getState));
    dispatch({
      type: USER_LODED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => {
  return {
    type: LOGOUT_SUCESS,
  };
};

export const tokenConfig = (getState) => {
  //Get Token from local storage
  const token = getState().auth.token;
  //Create Header to set token
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
