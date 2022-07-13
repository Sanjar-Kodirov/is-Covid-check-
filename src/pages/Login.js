import React, { useState, useContext } from "react";
import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpin from "react-loading-spin";
const AddPersonFormPage = () => {
  const navigate = useNavigate();
  const { setErrorHandler, errorHandler } = useContext(Context);
  const { loginErr, isLoading, isLogged } = errorHandler;
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const admin = "https://ptcr-app.herokuapp.com/admin";
  const postLoginData = async (event) => {
    event.preventDefault();
    setErrorHandler({
      ...errorHandler,
      isLoading: true,
    });
    axios
      .get(admin)
      .then(function (response) {
        const { name, password } = response.data.data.admin[0];

        if (loginData.name === name && loginData.password === password) {
          setErrorHandler({
            ...errorHandler,
            isLoading: false,
            isLogged: true,
          });
          navigate(`/admin`);
        } else {
          setErrorHandler({
            ...errorHandler,
            isLoading: false,
            loginErr: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function setLoginDataHandler(event) {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  return (
    <div>
      <div className="gs-neumorphic-main-card-outer-container">
        <div className="gs-neumorphic-main-card-container">
          <div className="gs-neumorphic-main-card">
            <div className="gs-neumorphic-signup gs-form-open">
              <div
                className="gs-neumorphic-signup-login-header gs-open"
                data-button="gs-neumorphic-signup"
              >
                Логин
              </div>
              {isLoading && (
                <LoadingSpin
                  duration="2s"
                  width="3px"
                  timingFunction="ease-in-out"
                  direction="alternate"
                  size="50px"
                  primaryColor="#e4ebf5"
                  secondaryColor="#6d78fa"
                  numberOfRotationsInAnimation={4}
                />
              )}
              <div className="gs-neumorphic-form-container">
                {loginErr && (
                  <p classNameName="text-danger">
                    Неправильный логин или пароль
                  </p>
                )}
                <form>
                  <input
                    type="text"
                    name="name"
                    className="gs-neumorphic-input"
                    placeholder="ФИО"
                    onChange={setLoginDataHandler}
                  />

                  <input
                    type="password"
                    name="password"
                    className="gs-neumorphic-input"
                    placeholder="Пароль"
                    onChange={setLoginDataHandler}
                  />

                  <button
                    onClick={postLoginData}
                    className="gs-neumorphic-button"
                  >
                    Логин
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPersonFormPage;
