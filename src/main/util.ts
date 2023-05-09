/* eslint import/prefer-default-export: off */
import { URL } from "url";
import path from "path";
import fs from "fs";
import axios from "axios";

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
}

export async function downloadUbuntuImage(events: any) {
  const url = process.env.UBUNTU_IMAGE_URL;

  const resp = await axios({
    url,
    method: "GET",
    responseType: "stream",
    onDownloadProgress: (progressEvent: any) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log("downloaded ", percentCompleted);

      events.reply("qemu-trigger", `Downloaded ${percentCompleted}%`);
    },
  });

  // Create a writable stream to the file
  const fileStream = fs.createWriteStream("ubuntu.qcow2");

  // Pipe the response stream to the file stream
  resp.data.pipe(fileStream);

  // Return a promise that resolves when the download is complete
  return new Promise((resolve, reject) => {
    fileStream.on("finish", () => {
      resolve("Download completed");
    });
    fileStream.on("error", () => {
      reject("Error downloading image");
    });
  });
}

export function checkFileDownloadedCorrectly(imagePath: string) {
  const downloadedSize = fs.statSync(imagePath).size;
  console.log("downloadedSize", typeof downloadedSize);

  // if (expectedFileSize !== downloadedSize) {
  //   fs.unlink("ubuntu.qcow2", (err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log("File is not downloaded correctly");
  //   });
  // } else {
  //   console.log("File is downloaded successfully");
  // }
}
