import React, {useState} from "react";
import background from "../assets/background_image.png";
import logo from "../assets/main_logo.jpg";

const Login = () => {

    const[showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => { setShowPassword(!showPassword) }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="card p-4 bg-opacity-80" style={{ maxWidth: "400px", width: "100%", opacity: "0.9"}}>
        <div class="text-center">
          <h2>Login to TaskHaven</h2>
        </div>
        <div class="my-2">
          <img src={logo} alt="logo" class="mx-auto d-block" style={{width: "100px"}}/>
        </div>

        <div class="row justify-content-center my-3">
          <form>
            <label for="email" class="form-label">
              Email address:
            </label>
            <div class="input-group mb-4">
              <span class="input-group-text">
                <i class="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="e.g. mario@example.com"
              />
            </div>

            <label for="password" class="form-label">
              Password:
            </label>
            <div class="input-group mb-4">
                <span class="input-group-text">
                <i class="bi bi-lock-fill"></i>
                </span>
                <input
                type= {showPassword ? "text" : "password"}
                id="password"
                class="form-control"
                placeholder="********"
                />
                <button
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={handleShowPassword}
                >
                    <i class={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                </button>
            </div>

            <button type="submit" class="btn btn-primary my-3 w-100">Login</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
