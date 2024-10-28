import { useState } from "react";
import { Modal, Box } from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { useProfileContext } from "../../hooks/profileHooks/useProfileContext";

const PhotoCard = ({ photo = {} }) => {
  const { title, url, thumbnailUrl } = photo;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(title | "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useProfileContext();

  // open modal
  const handleOpen = () => setOpen(true);
  // close modal
  const handleClose = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if input is empty
    if (input.trim() === "") return;

    try {
      // Update title
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${photo.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: input,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update the title. Please try again later.");
      }

      // update title, save to context and display updated title
      const updatedTitle = await res.json();
      dispatch({ type: "UPDATE_PHOTO_TITLE", payload: updatedTitle });
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.", { error });
    }
  };

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-green pb-2 border-b-2">
        <h2 className="text-green font-medium text-2xl  ">
          Photo Title: {title}
        </h2>
        <Button onClick={handleOpen}>Edit Title </Button>
        <Modal open={open} onClose={handleClose}>
          <Box className="modal">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleEdit}>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-green text-3xl font-black absolute top-5 right-5 cursor-pointer hover:text-neutral-600 transition ease-in delay-150"
              />
              <h2 className="text-green font-medium text-xl pb-4">
                Edit Title:
              </h2>
              <input
                type="text"
                value={input || title}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 border-2 border-green rounded-lg mb-4"
              />
              <Button>{loading ? "Saving..." : "Save"}</Button>
            </form>
          </Box>
        </Modal>
      </div>
      <div>
        <img
          src={url}
          alt={thumbnailUrl}
          className="w-1/4 h-1/4 object-cover justify-self-center pt-8"
        />
      </div>
    </div>
  );
};

export default PhotoCard;
