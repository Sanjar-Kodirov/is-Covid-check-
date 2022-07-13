import React, { useContext } from "react";
import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "react-loading-spin";

const AddPersonFormPage = () => {
  const { setPersonData, personData, postDate, errorHandler } =
    useContext(Context);

  const { isLoading, addPersonFormErr, isLogged } = errorHandler;

  const navigate = useNavigate();
  if (!isLogged) {
    navigate("/");
  }

  function setUserDataHandler(event) {
    const { name, value } = event.target;
    setPersonData({
      ...personData,
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
                Добавить человека
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
              {addPersonFormErr && (
                <p classNameName="text-danger">Пожалуйста заполните все поля</p>
              )}
              <div className="gs-neumorphic-form-container">
                <form>
                  <input
                    type="text"
                    name="name"
                    className="gs-neumorphic-input"
                    placeholder="ФИО"
                    onChange={setUserDataHandler}
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="gs-neumorphic-input"
                    onChange={setUserDataHandler}
                  />
                  <input
                    type="text"
                    name="Seria"
                    className="gs-neumorphic-input"
                    placeholder="Серия паспорта"
                    onChange={setUserDataHandler}
                  />
                  <select
                    onChange={setUserDataHandler}
                    className="gs-neumorphic-input"
                    name="CovidTest"
                    id=""
                  >
                    <option value="" disabled selected>
                      Ковид тест
                    </option>

                    <option value="positive">Позитивный</option>
                    <option value="negative">Негативный</option>
                  </select>
                  <input
                    type="date"
                    name="analysDate"
                    className="gs-neumorphic-input"
                    placeholder="Last Name"
                    onChange={setUserDataHandler}
                  />
                  <select
                    onChange={setUserDataHandler}
                    className="gs-neumorphic-input"
                    name="gender"
                    id=""
                  >
                    <option value="" disabled selected>
                      Пол
                    </option>

                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </select>
                  <button onClick={postDate} className="gs-neumorphic-button">
                    Добавить
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
