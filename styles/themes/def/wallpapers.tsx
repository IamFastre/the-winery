"use client";
import { IoFlowerOutline } from "@icons/io5/IoFlowerOutline";
import { IoRose } from "@icons/io5/IoRose";
import { PiFlowerLotusDuotone } from "@icons/pi/PiFlowerLotusDuotone";
import { PiFlowerDuotone } from "@icons/pi/PiFlowerDuotone";
import { LuMoonStar } from "@icons/lu/LuMoonStar";

import style from "./wallpapers.module.scss";

export function Scarlatta() {
  return (
    <div className={style.scarlatta}>
      <IoFlowerOutline />
      <IoRose />
      <PiFlowerLotusDuotone />
      <PiFlowerDuotone />
      <LuMoonStar />
    </div>
  );
}
