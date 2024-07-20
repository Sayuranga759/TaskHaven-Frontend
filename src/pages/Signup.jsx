import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Constants from "../constants/constants";
import * as EndPoints from "../constants/end_points";
import background from "../assets/background.jpg";
import logo from "../assets/logo.png";
import validator from "validator";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    submitted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateUserInput = () => {
    let isValid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (formData.name === "") {
      newErrors.name = Constants.EMPTY_NAME;
      isValid = false;
    }

    if (!validator.isEmail(formData.email)) {
      newErrors.email = Constants.INVALID_EMAIL;
      isValid = false;
    }

    if (!formData.password.match(Constants.PASSWORD_REGEX)) {
      newErrors.password = Constants.INVALID_PASSWORD;
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = Constants.MISMATCH_PASSWORD;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateUserInput()) {
      const apiUrl =
        process.env.REACT_APP_API_URL + EndPoints.API_ENDPOINTS.USER_REGISTER;

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      console.log(userData);

      axios
        .post(apiUrl, userData)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            toast.success("Signup successful!. Please login to continue.");
            navigate("/login");
          } else {
            toast.error("Signup failed.");
          }
        })
        .catch((error) => {
          toast.error("Signup failed. Please check your input.");
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
          paddingTop: "40px",
          paddingBottom: "20px",
        }}
      >
        <div
          class="card p-4"
          style={{ maxWidth: "400px", width: "100%", opacity: "0.9" }}
        >
          <div class="text-center">
            <h2>Signup to TaskHaven</h2>
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
              <label for="name" className="form-label">
                Name:
              </label>
              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-person-fill"></i>
                  </span>
                  <input
                    required
                    type="text"
                    id="name"
                    class="form-control"
                    placeholder="e.g. Mario"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>

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
              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock-fill"></i>
                  </span>
                  <input
                    required
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
              </div>

              <label for="confirmPassword" class="form-label">
                Confirm Password:
              </label>
              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock-fill"></i>
                  </span>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    class="form-control"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={handleShowConfirmPassword}
                  >
                    <i
                      class={`bi ${
                        showConfirmPassword
                          ? "bi-eye-fill"
                          : "bi-eye-slash-fill"
                      }`}
                    ></i>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="text-danger">{errors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                class="btn btn-primary my-3 w-100"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
