import { IoFlowerOutline } from "@icons/io5/IoFlowerOutline";
import { IoRose } from "@icons/io5/IoRose";
import { IoLeafOutline } from "@icons/io5/IoLeafOutline";
import { PiFlowerLotusDuotone } from "@icons/pi/PiFlowerLotusDuotone";
import { PiFlowerDuotone } from "@icons/pi/PiFlowerDuotone";
import { LuMoonStar } from "@icons/lu/LuMoonStar";

import ForestaWide from "@/styles/themes/svgs/foresta/wide.svg";
import ForestaLong from "@/styles/themes/svgs/foresta/long.svg";

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

export function foresta() {
  return (
    <div className={`${style.wallpaper} ${style.foresta}`}>
      <ForestaWide
        className={style.wide}
        viewBox="0 0 800 450"
        height width="100%"
        preserveAspectRatio="xMidYMax slice"
      />
      <ForestaLong
        className={style.long}
        viewBox="0 0 450 800"
        height width="100%"
        preserveAspectRatio="xMidYMax slice"
      />
    </div>
  );
}

const Wallpapers = {
  flowery,
  foresta,
};

export default Wallpapers;
