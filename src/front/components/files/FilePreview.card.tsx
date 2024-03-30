import { FileProp } from "@/front/types/file";
import Image from "next/image";

export default function FilePreview ({file, url, onClick, index}: {file?: File, url: string, onClick: (file: FileProp, index: number) => {}, index: number}) {
    if (file?.type.startsWith("image") || (file === undefined && url)) {
      return (
        <div
          style={{
            width: "100%",
            height: "120px",
            borderRadius: "5px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid #AAA3",
          }}
          onClick={() => onClick({file, url}, index)}
        >
          <Image
            fill
            objectFit="cover"
            // width={38}
            // height={38}
            alt={file?.name || index.toString()}
            src={url}
          />
        </div>
      );
    } else {
      return <i className="tabler-file-description" />;
    }
  };