import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type AuthMode = "signup" | "login";
type AuthFormValues = {
  email: string;
  password: string;
};

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [authError, setAuthError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>();

  function onSubmit(data: AuthFormValues) {
    setAuthError(null);

    if (!auth) {
      setAuthError("Auth is not available");
      return;
    }

    const result =
      mode === "signup"
        ? auth?.signUp(data.email, data.password)
        : auth?.login(data.email, data.password);

    if (result?.success) {
      reset();
      setAuthError(null);
      navigate("/");
      return;
    }

    if (result && !result.success) {
      setAuthError(result.error ?? "Something went wrong");
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message ?? ""}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be at max 12 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message ?? ""}</p>
              )}
            </div>

            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          {authError && (
            <p className="form-error" role="alert">
              {authError}
            </p>
          )}

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link">
                  <Link
                    to="/auth"
                    onClick={() => {
                      setMode("login");
                      setAuthError(null);
                    }}
                  >
                    Login
                  </Link>
                </span>
              </p>
            ) : (
              <p>
                Don't have an account yet?{" "}
                <span className="auth-link">
                  <Link
                    to="/auth"
                    onClick={() => {
                      setMode("signup");
                      setAuthError(null);
                    }}
                  >
                    Signup
                  </Link>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
