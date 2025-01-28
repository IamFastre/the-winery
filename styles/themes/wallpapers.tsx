import { IoFlowerOutline } from "@icons/io5/IoFlowerOutline";
import { IoRose } from "@icons/io5/IoRose";
import { IoLeafOutline } from "@icons/io5/IoLeafOutline";
import { PiFlowerLotusDuotone } from "@icons/pi/PiFlowerLotusDuotone";
import { PiFlowerDuotone } from "@icons/pi/PiFlowerDuotone";
import { LuMoonStar } from "@icons/lu/LuMoonStar";

import style from "./wallpapers.module.scss";

export function flowery() {
  return (
    <div className={`${style.wallpaper} ${style.flowery}`}>
      <IoFlowerOutline />
      <IoRose />
      <IoLeafOutline />
      <PiFlowerDuotone />
      <LuMoonStar />
      <PiFlowerLotusDuotone />
    </div>
  );
}

const Wallpapers = {
  flowery,
};

export default Wallpapers;
