// /*
//  * Main and demo navigation arrays
//  */
import { SiLinuxcontainers } from "react-icons/si";
import { AiFillCloud, AiTwotoneUnlock } from "react-icons/ai";
import { FaCubes } from "react-icons/fa";

const menu = [
  {
    name: "Containers",
    to: "/",
    icon: SiLinuxcontainers,
    filledIcon: SiLinuxcontainers,
  },
  {
    name: "Images",
    to: "/images",
    icon: AiFillCloud,
    filledIcon: AiFillCloud,
  },
  {
    name: "Volumes",
    to: "/volumes",
    icon: FaCubes,
    filledIcon: FaCubes,
  },
  {
    name: "Dev Environments",
    to: "/dev-environments",
    icon: AiTwotoneUnlock,
    filledIcon: AiTwotoneUnlock,
  },
];

export default menu;
