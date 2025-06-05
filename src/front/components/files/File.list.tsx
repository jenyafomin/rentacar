import { IconButton, Typography } from "@mui/material";
import FilePreview from "./FilePreview.card";
import { FileProp } from "@/front/types/file";

export default function FileList({
  files,
  handleRemoveFile,
  onClick = (file, i) => {console.log(`Clicked ${i}`)},
}: {
  files: Array<FileProp>;
  handleRemoveFile: (index: number) => any;
  onClick?: (file: FileProp, index: number) => any
}) {
  return (
    <div className="flex flex-wrap gap-4 gap-y-4 py-4 px-0">
      {files.map((fileProp: FileProp, i: number) => {
        const {file, url} = fileProp;
        return (
          <div
            key={i}
            className={`flex grow shrink max-w-[100%]`}
            style={{ position: "relative", minWidth: "160px" }}
          >
            <div className="file-details" style={{ width: "100%" }}>
              <div className="file-preview">
                <FilePreview file={file} url={url} index={i} onClick={onClick} />
              </div>
              <div>
                {/* {file !== undefined && <Typography className="file-size absolute" variant="body2">
                  {Math.round(file.size / 100) / 10 > 1000
                    ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                    : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                </Typography>} */}
              </div>
            </div>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => handleRemoveFile(i)}
              style={{
                position: "absolute",
                right: "-8px",
                top: "-8px",
                background: "#fff1",
                backdropFilter: "blur(8px)",
                padding: "2px",
                color: "#000",
                border: "1px solid #AAA3",
              }}
            >
              <i className="tabler-x text-xl" style={{}} />
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              onClick={() => handleRemoveFile(i)}
              style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                left: "8px",
                top: "8px",
                background: "#fff3",
                backdropFilter: "blur(8px)",
                padding: "2px",
                color: "#AAA",
                border: "1px solid #AAA3",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  mixBlendMode: "exclusion",
                  color: "#000",
                }}
              >
                {i+1}
              </span>
            </IconButton>
          </div>
        );
      })}
    </div>
  );
}
