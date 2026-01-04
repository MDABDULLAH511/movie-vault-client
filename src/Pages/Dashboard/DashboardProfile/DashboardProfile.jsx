import React, { useRef, useState } from "react";
import userIcon from "../../../assets/user2.png";
import { useQuery } from "@tanstack/react-query";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import Container from "../../../Components/Container";

const DashboardProfile = () => {
  const { user, setUser, updateUserProfile, setLoading } = useAuth();
  const axiosInstance = useAxios();

  const updateModal = useRef();
  const [viewImage, setViewImage] = useState();

  // react Hook Form
  const { register, handleSubmit } = useForm();

  // Load User
  const {
    refetch,
    isLoading,
    data: currentUsers = [],
  } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/email?email=${user.email}`);
      return res.data;
    },
  });
  const currentUser = currentUsers[0];

  //Update Profile Modal Open Handler
  const openUpdateProfileModal = () => {
    setViewImage(currentUser.photoURL);
    updateModal.current.showModal();
  };

  // Update Profile Handler
  const handleUpdateProfile = async (data) => {
    //store the image and get the Photo url
    let profileImage = "";
    const selectedFile = data.profileImg?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      await axios.post(imageAPI_URL, formData).then((res) => {
        const photoURL = res.data.data.url;
        profileImage = photoURL;
      });
    }

    const profilePhoto = profileImage || currentUser.photoURL;

    const updateProfileData = {
      displayName: data.name,
      photoURL: profilePhoto,
    };

    updateUserProfile(updateProfileData)
      .then(() => {
        setUser({ ...user, displayName: data.name, photoURL: profilePhoto });
        axiosInstance
          .patch(`/user?email=${user.email}`, updateProfileData)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: "Your profile has been updated successfully.",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
              });
            }
          });
      })
      .catch((error) => {
        console.oog(error);
        setLoading(false);
      });

    updateModal.current.close();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="py-15 md:py-20 space-y-5 md:space-y-10 max-w-2xl mx-auto">
          <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-base-200 space-y-5 flex flex-col items-center gap-5 text-white">
            {/* Author Image */}
            <div className="relative">
              <img
                tabIndex={0}
                src={currentUser.photoURL ? currentUser.photoURL : userIcon}
                alt=""
                className={`w-35 h-35 rounded-full bg-primary cursor-pointer${
                  user.photoURL ? "p-0.5" : "p-1.5"
                }`}
              />

              <button
                onClick={openUpdateProfileModal}
                className="cursor-pointer absolute -bottom-1 -right-2 "
              >
                <div className="tooltip tooltip-bottom" data-tip="Edit Profile">
                  <BiSolidMessageSquareEdit size={30} color="#f6b900" />
                </div>
              </button>
            </div>

            {/* Name, Email, Total Lesson, Total Favorites, About */}
            <div className="w-full space-y-2">
              <div className="flex justify-between font-semibold">
                <h5>Name:</h5>
                <h5>{currentUser.displayName}</h5>
              </div>

              <div className="flex justify-between font-semibold">
                <h5>Email:</h5>
                <h5>{currentUser.email}</h5>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/*Update profile popup modal */}
      <dialog ref={updateModal} className="modal modal-middle">
        <div className="modal-box  max-w-xl">
          <div className="  p-2 md:p-5 rounded-xl ">
            {/* Page Title */}
            <div className=" text-center mb-8">
              <h2 className="font-bold text-xl md:text-2xl mb-2">
                Update Profile
              </h2>
            </div>

            {/* Form to Update profile */}
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <fieldset className="fieldset text-[16px]">
                {/* Profile Image */}
                <div className="flex flex-col md:flex-row mt-6 gap-5 items-center relative">
                  <div>
                    <label className="labelFileImgPro">
                      <IoCloudUploadOutline
                        size={30}
                        className="bg-white p-1 rounded-full"
                      />

                      <input
                        type="file"
                        className="inputImgPro "
                        {...register("profileImg", {
                          onChange: (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setViewImage(URL.createObjectURL(file));
                            }
                          },
                        })}
                      />
                    </label>
                  </div>

                  {/* Show selected Img */}
                  <div className="absolute -z-1">
                    {viewImage && (
                      <img
                        src={viewImage}
                        alt=""
                        className="h-[150px] w-[150px] rounded-full object-cover object-center"
                      />
                    )}
                  </div>
                </div>

                {/* Name */}
                <label className="label mt-5">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input w-full"
                  defaultValue={currentUser.displayName}
                  placeholder="Name"
                />

                <button className="py-3 px-4 rounded-lg mt-6 text-[16px] bg-primary font-semibold cursor-pointer text-white mb-3">
                  Update
                </button>
              </fieldset>
            </form>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn border-0 shadow bg-[#e03233] text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardProfile;
