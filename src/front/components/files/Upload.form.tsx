import { Avatar, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export function UploadForm({
  onDrop,
  onDropRejected,
}: {
  onDrop: (acceptedFiles: File[]) => void;
  onDropRejected: () => void;
}) {
  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    // maxFiles: 2,
    maxSize: 2000000, // TODO: move to props or default value
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop,
    onDropRejected,
  });
  
  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      style={{
        border: "1px dashed #fff3",
        padding: "8px",
        borderRadius: "3px",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <div className="flex items-center flex-col">
        <Avatar variant="rounded" className="bs-12 is-12 mbe-9">
          <i className="tabler-upload" />
        </Avatar>
        <Typography variant="h4" className="mbe-2.5">
          Drop files here or click to upload.
        </Typography>
        <Typography>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
        <Typography>Max 2 files and max size of 2 MB</Typography>
      </div>
    </div>
  );
}
