import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import registerPageBGImage from "../../assets/authbg.webp";
import useAuth from "../../Hooks/UseAuth";
import SocialLogin from "./SocialLogin";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const { setUser, registerUser, updateUserProfile, setLoading } = useAuth();
  const axiosInstance = useAxios();

  const location = useLocation();
  const navigate = useNavigate();

  // react Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImage = data.photo && data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        //store the image and get the Photo url
        const formData = new FormData();
        formData.append("image", profileImage);
        const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(imageAPI_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          //Create user on database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosInstance
            .post("/user", userInfo)
            .then(() => {})
            .catch(() => {
              toast.error("🐾 Something went wrong. Please try again later!");
            });

          // Update User Profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              toast("Account created successfully! 🎉");
              navigate(location.state || "/");
            })
            .catch(() => {
              toast.error("🐾 Something went wrong. Please try again later!");
            });
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("📧 This email is already registered. Try logging in!");
            break;

          case "auth/invalid-email":
            toast.error("❌ The email address format looks invalid.");
            break;

          case "auth/missing-password":
            toast.error("⚠️ Please enter your password before continuing.");
            break;

          case "auth/user-not-found":
            toast.error(
              "🙈 No account found with this email. Please sign up first."
            );
            break;

          case "auth/wrong-password":
            toast.error("🚫 Incorrect password. Please try again!");
            break;

          case "auth/too-many-requests":
            toast.error(
              "🕒 Too many attempts! Please wait and try again later."
            );
            break;

          case "auth/network-request-failed":
            toast.error(
              "🌐 Network error. Please check your internet connection."
            );
            break;

          case "auth/invalid-credential":
            toast.error(
              "❗Invalid credentials. Please check your email and password."
            );
            break;

          case "auth/popup-closed-by-user":
            toast.error("🙋‍♂️ Login popup closed before finishing. Try again!");
            break;

          case "auth/operation-not-allowed":
            toast.error(
              "🚷 This sign-in method is not allowed. Contact support."
            );
            break;

          default:
            toast.error("🐾 Something went wrong. Please try again later!");
        }
      });
    setLoading(false);
  };

  return (
    <div
      className="bg-cover bg-center relative flex items-center justify-center py-20 px-5 lg:py-0 lg-px-0 h-screen "
      style={{
        backgroundImage: `url(${registerPageBGImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      {/* Register Form */}

      <div className="text-white max-w-xl mx-auto bg-base-200 relative z-9 p-5 lg:p-15 flex-1 items-center rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            Movie <span className="text-primary fJost">Vault</span>
          </h2>
          <p>“Sign up to discover, save, and manage movies your way.</p>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset text-[16px]">
            {/* Image */}
            <label className="label mt-3">Image</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full  bg-black/10 border border-primary/50 file:bg-primary  file:text-white"
              placeholder="photo"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-600">Photo is required</p>
            )}

            {/* Name */}
            <label className="label mt-3">Name</label>
            <input
              type="text"
              {...register("name")}
              className="authInput"
              placeholder="Name"
            />

            {/* Email */}
            <label className="label mt-3">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="authInput"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email is required</p>
            )}

            {/* Password */}
            <label className="label mt-3">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\;:'",.<>/?`~]).{6,}$/,
              })}
              className="authInput"
              placeholder="Password"
            />
            {errors.password?.type == "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                {" "}
                Password must include uppercase, lowercase, number & special
                character (min 6 chars)
              </p>
            )}

            <button className="py-3 px-4 rounded-lg mt-4 text-[16px] bg-primary font-semibold cursor-pointer text-white mb-3">
              Register
            </button>

            <div>
              <p>
                Already have an account?
                <Link
                  state={location.state}
                  className="text-primary font-bold"
                  to="/login"
                >
                  {" "}
                  Login
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

export default Register;
