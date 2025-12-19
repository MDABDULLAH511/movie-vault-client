import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import loginPageBGImage from "../../assets/authPageBg.jpg";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/UseAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, singInUser, setLoading } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    singInUser(data.email, data.password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful! 🎉");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("❌ Please enter a valid email address.");
            break;

          case "auth/user-not-found":
            toast.error("🙁 No account found with this email.");
            break;

          case "auth/wrong-password":
          case "auth/invalid-credential":
          case "auth/invalid-login-credentials":
            toast.error("❌ Invalid email or password. Please try again.");
            break;

          case "auth/too-many-requests":
            toast.error("🚫 Too many attempts. Try again later.");
            break;

          default:
            toast.error("⚠️ Login failed. Please try again.");
        }
        setLoading(false);
      });
  };

  return (
    <div
      className="bg-cover bg-center relative flex items-center justify-center py-20 px-5 lg:py-0 lg-px-0 h-screen "
      style={{
        backgroundImage: `url(${loginPageBGImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      {/* Login Form */}

      <div className="text-white max-w-xl mx-auto bg-base-200 relative z-9 p-5 lg:p-15 flex-1 items-center rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            Movie <span className="text-primary fJost">Vault</span>
          </h2>
          <p>Please sign in to continue!</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset text-[16px]">
            <label className="label mt-3">Email Address or Username</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="authInput"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            <label className="label mt-3">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="authInput"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}

            {/* Submit Button */}
            <div>
              <Link className="underline">Forget Password?</Link>
            </div>

            <button className="py-3 px-4 rounded-lg mt-4 text-[16px] bg-primary font-bold cursor-pointer text-white mb-3">
              Login
            </button>

            {/* Go to register */}
            <div>
              <p>
                If You are new?
                <Link
                  state={location?.state}
                  className="text-primary font-bold"
                  to="/register"
                >
                  {" "}
                  Register
                </Link>
              </p>
            </div>
          </fieldset>
        </form>

        {/* Login With Google Button */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
