"use client";
import { useState } from "react";
import { IoInformationCircle, IoEllipsisVerticalOutline, IoEllipsisHorizontalOutline } from "react-icons/io5";

import { focusable } from "@/utils/client";
import { Modal } from "@/providers/ModalProvider";
import { OptionsModal } from "@/components";

import colors from '@/styles/colors.module.scss';

interface CardOptionsButtonProps {
  id: number;
  activeClassName: string;
  vertical?: boolean;
}

export function CardOptionsButton(props:CardOptionsButtonProps) {
  const Icon = props.vertical ? IoEllipsisVerticalOutline : IoEllipsisHorizontalOutline;
  const showOptionsState = useState<boolean>(false);

  return (
    <>
      <div
        id="options-post"
        {...focusable(props.activeClassName, () => showOptionsState[1](s => !s))}
      >
        <Icon color={colors.quinary} />
      </div>

      <Modal state={showOptionsState}>
        <OptionsModal
          close={() => showOptionsState[1](false)}
          options={[
            { title: "Card ID", icon: IoInformationCircle, subtitle: `c:${props.id}`, flColor: colors.primary, skColor: colors.none, bgColor: colors.secondary },
          ]}
        />
      </Modal>
    </>
  );
}
