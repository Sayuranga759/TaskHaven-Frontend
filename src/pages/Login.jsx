import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as EndPoints from "../constants/end_points";
import * as Constants from "../constants/constants";
import background from "../assets/background.jpg";
import logo from "../assets/logo.png";
import validator from "validator";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: Constants.EMPTY_STRING,
    password: Constants.EMPTY_STRING,
    submitted: false,
  });

  const [errors, setErrors] = useState({
    email: Constants.EMPTY_STRING,
    password: Constants.EMPTY_STRING,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateUserInput = () => {
    let isValid = true;
    let newErrors = {
      email: Constants.EMPTY_STRING,
      password: Constants.EMPTY_STRING,
    };

    if (!validator.isEmail(formData.email)) {
      newErrors.email = Constants.INVALID_EMAIL;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateUserInput()) {
      const apiUrl =
        process.env.REACT_APP_API_URL + EndPoints.API_ENDPOINTS.USER_LOGIN;

      const userData = {
        email: formData.email,
        password: formData.password,
      };

      axios
        .post(apiUrl, userData)
        .then((response) => {
          if (response.status === 200) {
            setAuth(response.data.AccessToken);
            Cookies.set(Constants.AUTH_COOKIE, response.data.AccessToken, { expires: 1 }); // Store the token in a cookie for 1 day
            toast.success(Constants.LOGIN_SUCCESS);
            navigate("/");
          } else {
            toast.error(Constants.LOGIN_FAILED_SHORT);
          }
        })
        .catch((error) => {
          toast.error(Constants.LOGIN_FAILED_LONG);
        });
    }
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          class="card p-4 bg-opacity-80"
          style={{ maxWidth: "400px", width: "100%", opacity: "0.9" }}
        >
          <div class="text-center">
            <h2>Login to TaskHaven</h2>
          </div>
          <div class="my-2">
            <img
              src={logo}
              alt="logo"
              class="mx-auto d-block"
              style={{ width: "100px" }}
            />
          </div>

          <div class="row justify-content-center my-3">
            <form>
              <label for="email" class="form-label">
                Email address:
              </label>
              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    required
                    type="email"
                    id="email"
                    class="form-control"
                    placeholder="e.g. mario@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              <label for="password" class="form-label">
                Password:
              </label>
              <div class="input-group mb-4">
                <span class="input-group-text">
                  <i class="bi bi-lock-fill"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  class="form-control"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={handleShowPassword}
                >
                  <i
                    class={`bi ${
                      showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}

              <button
                type="submit"
                class="btn btn-primary my-3 w-100"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
