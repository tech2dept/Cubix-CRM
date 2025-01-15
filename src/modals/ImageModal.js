import { Modal, Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const ImageModal = ({ openModal, onClose, modalImage, onImageChange }) => (
  <Modal open={openModal} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "white",
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
        maxWidth: "10%",
        maxHeight: "90%",
        textAlign: "center",
        position: "relative", // Ensures positioning for the close button
      }}
    >
      {/* Close Button */}
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          padding: "4px", // Smaller padding
          fontSize: "0.875rem", // Small size for the icon
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* Display Image */}
      <img
        src={modalImage}
        alt="Product"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />

      {/* Change Image Button */}
      <div>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          style={{ display: "none" }}
          onChange={onImageChange} // Call the onImageChange handler
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" color="primary" sx={{ padding: "4px 8px", fontSize: "0.875rem" }}>
            {/* Change Image */}
            <PhotoCameraIcon />
          </Button>
        </label>
      </div>
    </Box>
  </Modal>
);

export default ImageModal;
