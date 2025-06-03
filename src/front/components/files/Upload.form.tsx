import { Avatar, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export function UploadForm({
  onDrop,
  onDropRejected,
  maxSize = 2000000,
}: {
  onDrop: (acceptedFiles: File[]) => void;
  onDropRejected: () => void;
  maxSize?: number;
}) {
  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    // maxFiles: 2,
    maxSize: maxSize,
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
        <Typography>Max size of 10 MB per file</Typography>
      </div>
    </div>
  );
}
