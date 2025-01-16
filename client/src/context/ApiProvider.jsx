// src/context/ApiProvider.js
import ApiContext from "./ApiContext.jsx";
import apiRequest from "../api/api.jsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null)

  const fetchData = async (endpoint, method, body, headers) => {
    try {
      const result = await apiRequest(endpoint, method, body, headers);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserData = async (token) => {
    const endpoint = "user/getuser";
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
      "auth-token": token,
    };
    const body = {};
    try {
      const data = await fetchData(endpoint, method, body, headers);
      if (!data.success) {
        console.log(data.message);
      } else if (data.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      try {
        const parseToken = JSON.parse(token);
        setUserToken(parseToken)
        getUserData(parseToken)
          .then((userData) => {
            if (userData) {
              setUser(userData.data);
            }
          })
          .catch((e) => {
            console.log("Failed to fetch the user data:", e);
          });
      } catch (e) {
        console.log("Failed to parse token:", e);
      }
    }
  }, []);

  const logIn = async (authtoken) => {
    try {
      setUserToken(authtoken)
      getUserData(authtoken)
        .then((userData) => {
          if (userData) {
            setUser(userData.data);
            Cookies.set("userToken", JSON.stringify(authtoken), { expires: 7 });
          }
        })
        .catch((e) => {
          console.log("Failed to fetch the user data:", e);
        });
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <ApiContext.Provider value={{ fetchData, logIn, user, userToken, setUserToken }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
