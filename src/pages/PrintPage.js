import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../printPage/main.css";
import flag from "../printPage/flag_border.png";
const PrintPage = () => {
  const [singlePersonInfo, setSinglePersonInfo] = useState("");
  const [url, setUrl] = useState();
  const params = useParams();
  const code = window.location.href;
  console.log(singlePersonInfo);
  const { name, gender, dateOfBirth, Seria, CovidTest, analysDate } =
    singlePersonInfo;

  function qrCodeGenerator() {
    QRCode.toDataURL(code).then((data) => {
      setUrl(data);
    });
  }
  useEffect(() => {
    qrCodeGenerator();
    axios
      .get(`https://ptcr-app.herokuapp.com/person/${params.id}`)
      .then((resp) => {
        setSinglePersonInfo(resp.data.data.person);
      });
  }, [params.id]);
  return (
    <div className="hold-transition sidebar-mini px-2">
      <div className="wrapper">
        <div className="content-wrapper px-md-4 py-2">
          <div className="content-header">
            <div
              id="main-name"
              className="d-flex flex-md-row flex-column justify-content-between"
            >
              <h1 style={{ fontSize: "30px" }} className="my-lg-4 text-dark">
                {name}
              </h1>
              <div className="">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn my-4 btn-info"
                >
                  <i className=" fas fa-print"></i> Распечатать
                </button>
              </div>
            </div>
          </div>
          <div className="d-print-none"></div>
          <div className="content px-2">
            <div className="row">
              <div className="col-12">
                <div
                  style={{
                    border: "40px solid red",
                    borderImage: `url(${flag}) 12% stretch`,
                  }}
                  className="card border-flag pt-2 px-2 pb-1 pt-lg-5 px-lg-5 pb-lg-2"
                >
                  <div className="row mb-5">
                    <div className="col-md-5 text-center my-auto font-weight-bold text-uppercase">
                      <h4>Ministry of Health of the Republic of Uzbekistan</h4>
                      <h4>CONFIRMATION OF COVID-19 TEST RESULT</h4>
                    </div>
                    <div className="col-md-2">
                      <div className="mx-auto">
                        <img
                          src="https://coronavirus-test.ssv.uz/images/emblem.svg"
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="col-md-5 text-center my-auto font-weight-bold text-uppercase">
                      <h4>
                        Министерство Здравоохранения Республики Узбекистан
                      </h4>
                      <h4>Подтверждение результата теста COVID-19</h4>
                    </div>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>ID / Номер: </strong>
                      <span>3634669</span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>
                        Laboratory (name) / Лаборатория (название):
                      </strong>
                      <span>ЧП &quot;SHEDEVR DENTA MED&quot;</span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>
                        Place of sampling / Место забора анализа :{" "}
                      </strong>
                      <span>ЧП &quot;SHEDEVR DENTA MED&quot;</span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>Research method / Метод исследования: </strong>
                      <span>
                        Real-Time Polymerase chain reaction method (Real-Time
                        PCR) / Полимеразная цепная реакция в реальном времени
                        (ПЦР)
                      </span>
                    </h5>
                  </div>
                  <hr style={{ border: "4px solid #bbb" }} />
                  <div className="my-1">
                    <h5>
                      <strong>Passport / Серия и номер паспорта: </strong>
                      <span id="passport-serie">{Seria}</span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>Full name / Полное имя : </strong>
                      <span id="min-name">{name}</span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>Birth date / Дата рождения : </strong>
                      <span id="birth-date">{dateOfBirth}</span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>Sex / Пол : </strong>
                      <span id="sex"> {gender} </span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <h5>
                      <strong>Analysis date / Дата сдачи анализа : </strong>
                      <span id="analize"> {analysDate} </span>
                    </h5>
                  </div>
                  <div className="my-1 d-flex align-items-baseline">
                    <h5 className="mr-2">
                      <strong>
                        Test result and date / Результат и дата теста :
                      </strong>
                    </h5>
                    <h4>
                      <span id="results">{CovidTest}</span>
                      <strong id="resultdate">(24-05-2022 17:03)</strong>
                    </h4>
                  </div>
                  <div className="qr-code">
                    <img
                      style={{ width: "250px" }}
                      src={url}
                      className="qr-image"
                    />
                  </div>
                  <div className="row my-2">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <div id="qrContainer" className="w-100"></div>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="mt-5 mx-auto text-center">
                    <h6 className="text-uppercase">
                      <span>
                        Служба санитарно-эпидемиологического благополучия и
                        общественного здоровья Республики Узбекистан
                      </span>
                    </h6>
                    <h6>
                      <span>Адрес: </span>
                      <span>
                        Tashkent city. Chilanzar district, Bunyodkor street, 46
                      </span>
                    </h6>
                    <h6>
                      <span>Телефон: </span>
                      <a href="tel:998712761606">+998 71 276 16 06</a>
                    </h6>
                    <h6>
                      <span>Email: </span>
                      <a href="mailto:kancelyariyaresdsenm@minzdrav.uz">
                        kancelyariyaresdsenm@minzdrav.uz
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="main-footer d-print-none">
          <div className="float-right d-none d-sm-inline">v1.1</div>
          {/* <strong>
            Copyright &copy; <span id="year"></span>
            <a href="https://itmed.uz" target="_blank">
              IT MED
            </a>
            .
          </strong> */}
          All rights reserved.
        </footer>

        {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default PrintPage;
