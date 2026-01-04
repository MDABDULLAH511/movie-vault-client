import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const WatchedButton = ({ movie }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [isWatched, setIsWatched] = useState(false);

  //if user have check on DB Already Added to Watched before or not
  useEffect(() => {
    if (user?.email && movie?._id) {
      axiosInstance
        .get(`/watched/check?movieId=${movie._id}&userEmail=${user.email}`)
        .then((res) => {
          setIsWatched(res.data.isWatched);
        });
    }
  }, [user, movie, axiosInstance]);

  const handleToggleWatched = async (movieId, isChecked) => {
    if (isChecked) {
      await axiosInstance.post("/watched", {
        movieId,
        userEmail: user.email,
      });

      toast("Added to watch list");
    } else {
      await axiosInstance.delete("/watched", {
        data: { movieId, userEmail: user.email },
      });

      toast("Removed from watch list");
    }
  };
  return (
    <StyledWrapper>
      <div>
        <input
          type="checkbox"
          id="watched"
          checked={isWatched}
          onChange={(e) => {
            if (!user) {
              toast.warn("Please log in to add watch list", {
                position: "top-left",
                theme: "dark",
              });
              return;
            }

            setIsWatched(e.target.checked);
            handleToggleWatched(movie._id, e.target.checked);
          }}
        />

        <label className="watchedContainer" htmlFor="watched">
          <svg
            className="feather feather-heart"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={24}
            width={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div className="action">
            <span className="option-1">Add to Watch List</span>
            <span className="option-2">Added to Watch List</span>
          </div>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .watchedContainer {
    background-color: #ffffff;
    color: #000000 !important;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 15px;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    color: rgb(255, 255, 255);
  }

  #watched {
    display: none;
  }
  #watched:checked + .watchedContainer svg {
    fill: hsl(0deg 100% 50%);
    stroke: hsl(0deg 100% 50%);
    animation: heartButton 1s;
  }

  @keyframes heartButton {
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.3);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }

  #watched + .watchedContainer .action {
    position: relative;
    overflow: hidden;
    display: grid;
  }

  #watched + .watchedContainer .action span {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;
    transition: all 0.5s;
  }

  #watched + .watchedContainer .action span.option-1 {
    transform: translate(0px, 0%);
    opacity: 1;
  }

  #watched:checked + .watchedContainer .action span.option-1 {
    transform: translate(0px, -100%);
    opacity: 0;
  }

  #watched + .watchedContainer .action span.option-2 {
    transform: translate(0px, 100%);
    opacity: 0;
  }

  #watched:checked + .watchedContainer .action span.option-2 {
    transform: translate(0px, 0%);
    opacity: 1;
  }
`;

export default WatchedButton;
