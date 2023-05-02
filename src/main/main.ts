/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";
import { app, BrowserWindow, shell, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";

import { spawn, exec } from "child_process";

const getQemuLogs = (events: any) => {
  // const qemuPath = path.join("qemu", "bin", "qemu-system-x86_64");
  // const qemuImg = path.join("qemu", "bin", "qemu-img");

  log.transports.file.fileName = path.resolve("logs", "myapp.log");
  const qemuPath = path.join(
    process.resourcesPath,
    "qemu",
    "bin",
    "qemu-system-x86_64"
  );
  const qemuImg = path.join(process.resourcesPath, "qemu", "bin", "qemu-img");

  // const ubuntuIso = "ubuntu/ubuntu.iso";
  // const ubuntuQcow2 = "ubuntu.qcow2";
  const ubuntuIso = path.join(process.resourcesPath, "ubuntu", "ubuntu.iso");
  const ubuntuQcow2 = path.join(process.resourcesPath, "ubuntu.qcow2");

  const qemuImage = spawn(
    qemuImg,
    [
      "create",
      "-f",
      "qcow2",
      `${path.join(process.resourcesPath, "ubuntu.qcow2")}`,
      "10G",
    ],
    {
      stdio: ["pipe", "pipe", "pipe"],
    }
  );

  qemuImage.stdout.on("data", (data: any) => {
    log.info("Created image successfully");
    log.info(`QEMU stdout: ${data}`);
    events.reply("qemu-trigger", data.toString());
  });

  qemuImage.stderr.on("data", (data: any) => {
    log.info(`QEMU stderr: ${data}`);
    events.reply("qemu-trigger", data.toString());
  });

  qemuImage.on("close", (code: any) => {
    log.info(`QEMU process exited with code ${code}`);
    events.reply("qemu-trigger", `QEMU process exited with code ${code}`);
  });

  const qemuBoot = spawn(
    qemuPath,
    ["-m", "1024", "-boot", "d", "-cdrom", ubuntuIso, "-hda", ubuntuQcow2],
    {
      stdio: ["pipe", "pipe", "pipe"],
    }
  );

  qemuBoot.stdout.on("data", (data: any) => {
    log.info("Booting up VM");
    log.info(`QEMU stdout: ${data}`);

    events.reply("qemu-trigger", data.toString());
  });

  qemuBoot.stderr.on("data", (data: any) => {
    log.info(`QEMU stderr: ${data}`);
    events.reply("qemu-trigger", data.toString());
  });

  qemuBoot.on("close", (code: any) => {
    log.info(`QEMU process exited with code ${code}`);
    events.reply("qemu-trigger", `QEMU process exited with code ${code}`);
  });

  // const qemu = spawn(
  //   qemuPath,
  //   [
  //     "-machine",
  //     "q35",
  //     "-cpu",
  //     "qemu64",
  //     "-smp",
  //     "2",
  //     "-m",
  //     "4G",
  //     "-drive",
  //     `file=ubuntu/ubuntu.iso,format=raw,if=virtio`,
  //     "-net",
  //     "nic,model=virtio",
  //     "-net",
  //     "user",
  //   ],
  //   {
  //     stdio: ["pipe", "pipe", "inherit"],
  //   }
  // );

  // qemu.stdout.on("data", (data: any) => {
  //   console.log(`QEMU stdout: ${data}`);
  //   events.reply("qemu-trigger", data.toString());
  // });

  // qemu.on("close", (code: any) => {
  //   console.log(`QEMU process exited with code ${code}`);
  //   events.reply("qemu-trigger", `QEMU process exited with code ${code}`);
  // });
};

class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// ipcMain.on("ipc-example", async (event, arg) => {
//   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//   console.log(msgTemplate(arg));

//   event.reply("ipc-example", msgTemplate("pong"));
// });

ipcMain.on("qemu-trigger", async (event, arg) => {
  try {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;

    getQemuLogs(event);

    // event.reply("qemu-trigger", "pong");
  } catch (error: any) {
    log.warn("Error in QEMU", error);
    console.log("Error", error);
    event.reply("qemu-trigger", error.message);
  }
});

ipcMain.on("qemu-logs", async (event, arg) => {
  try {
    // const qemuPath = path.join("qemu", "bin", "qemu-system-x86_64");

    const qemuPath = path.join(
      process.resourcesPath,
      "qemu",
      "bin",
      "qemu-system-x86_64"
    );

    const ubuntuIso = path.join(process.resourcesPath, "ubuntu", "ubuntu.iso");

    const qemu = spawn(qemuPath, [
      "-machine",
      "q35",
      "-cpu",
      "qemu64",
      "-smp",
      "2",
      "-m",
      "4G",
      "-drive",
      `file=${ubuntuIso},format=raw,if=virtio`,
      "-net",
      "nic,model=virtio",
      "-net",
      "user",
    ]);

    qemu.on("error", async (error: any) => {
      console.log(`QEMU stdout: ${error}`);
      event.reply("qemu-logs", `Error: ${error.toString()}`);
    });

    qemu.stdout.on("data", async (data: any) => {
      try {
        await data;
        console.log(`QEMU stdout: ${data}`);
        event.reply("qemu-logs", "data: suiiii");
      } catch (error: any) {
        console.log("error while in qemu", error);
      }
    });

    qemu.stderr.on("data", (data: any) => {
      console.error(`QEMU stderr: ${data}`);
      event.reply("qemu-logs", `error: ${data.toString()}`);
    });

    qemu.on("close", (code: any) => {
      console.log(`QEMU process exited with code ${code}`);
    });
  } catch (error: any) {
    console.log("error while in qemu", error);
    log.warn("Error in QEMU", error);
    event.reply("qemu-logs", error.message);
  }
});

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../.erb/dll/preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.

      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
