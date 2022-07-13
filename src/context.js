import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Context = createContext();

let postMemberUrl = "https://ptcr-app.herokuapp.com/person";

const ContextProvider = ({ children }) => {
  let navigate = useNavigate();
  const initialState = {
    name: "",
    gender: "",
    dateOfBirth: "",
    Seria: "",
    CovidTest: "",
    analysDate: "",
  };
  const errorState = {
    isLoading: false,
    loginErr: false,
    isLogged: false,
    loginErrText: "Неправильный логин или пароль",
    addPersonFormErr: "",
  };
  const illNessState = {
    negatives: 0,
    positives: 0,
    totals: 0,
  };
  const [personData, setPersonData] = useState(initialState);
  // const [formErrors, setFormErrors] = useState("");
  const [errorHandler, setErrorHandler] = useState(errorState);
  const [illnessStatistic, setIllnessStatistic] = useState(illNessState);
  // post data of users
  const postDate = async (event) => {
    event.preventDefault();
    setErrorHandler({
      ...errorHandler,
      isLoading: true,
    });
    axios
      .post(postMemberUrl, personData)
      .then(function (response) {
        setErrorHandler({
          ...errorHandler,
          isLoading: false,
        });
        navigate(`/printpage/${response.data.data.person._id}`);
      })
      .catch(function (error) {
        setErrorHandler({
          ...errorHandler,
          isLoading: false,
          addPersonFormErr: error.message,
        });
      });
  };
  const getAllPersons = (async) => {
    console.log("I am working");
    axios
      .get(postMemberUrl)
      .then(function (response) {
        console.log(response.data.data.person);
        const negatives = response.data.data.person.filter((covid) => {
          return covid.CovidTest === "-";
        });
        const positive = response.data.data.person.filter((covid) => {
          return covid.CovidTest === "Positive";
        });

        setIllnessStatistic({
          ...illnessStatistic,
          negatives: negatives.length,
          positives: positive.length,
          totals: response.data.data.person.length,
        });
      })
      .catch(function (error) {
        // setFormErrors(error.response.data);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPersons();
  }, []);
  return (
    <Context.Provider
      value={{
        postDate,
        setPersonData,
        personData,
        illnessStatistic,
        setErrorHandler,
        errorHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
