"use client";
import { useState } from "react";
import { IoInformationCircle } from "@icons/io5/IoInformationCircle";
import { IoEllipsisVerticalOutline } from "@icons/io5/IoEllipsisVerticalOutline";
import { IoEllipsisHorizontalOutline } from "@icons/io5/IoEllipsisHorizontalOutline";
import { IoCopy } from "@icons/io5/IoCopy";
import { IoCloseCircle } from "@icons/io5/IoCloseCircle";
import { IoCheckmarkCircle } from "@icons/io5/IoCheckmarkCircle";

import { focusable } from "@/utils/client";
import { Modal } from "@/providers/ModalProvider";
import { useToaster } from "@/providers/Toaster";
import { OptionsModal } from "@/components/Modals";

import colors from '@/styles/colors.module.scss';

interface CardOptionsButtonProps {
  id: number;
  activeClassName: string;
  postTitle:string | null;
  postContent:string;
  vertical?: boolean;
}

export function CardOptionsButton(props:CardOptionsButtonProps) {
  const Icon = props.vertical ? IoEllipsisVerticalOutline : IoEllipsisHorizontalOutline;
  const toaster = useToaster();
  const showOptionsState = useState<boolean>(false);

  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<boolean>(false);

  const onCopySuccess = () => {
    setCopySuccess(true);
    toaster.add({ message: "Link copied successfully", type: 'success' });
  };

  const onCopyError = () => {
    setCopyError(true);
    toaster.add({ message: "Link couldn't be copied", type: 'error' });
  };

  const onTryCopy = () => {
    if (navigator.clipboard)
      navigator.clipboard.writeText(props.postTitle ? `# ${props.postTitle}\n\n${props.postContent}` : props.postContent)
        .then(onCopySuccess)
        .catch(onCopyError);
    else
      onCopyError();

    setTimeout(() => {
      setCopySuccess(false);
      setCopyError(false);
    }, 3000);
  };

  return (
    <>
      <div
        id="options-post"
        {...focusable(props.activeClassName, () =>
          showOptionsState[1]((s) => !s)
        )}
      >
        <Icon color={colors.quinary} />
      </div>

      <Modal state={showOptionsState}>
        <OptionsModal
          close={() => showOptionsState[1](false)}
          options={[
            {
              icon: IoInformationCircle,
              title: "Card ID",
              subtitle: `c:${props.id}`,
              flColor: colors.primary,
              skColor: colors.none,
              bgColor: colors.secondary,
            },
            {
              icon: copyError
              ? IoCloseCircle
              : copySuccess
              ? IoCheckmarkCircle
              : IoCopy,
              title: copyError
                ? "Uh-oh"
                : copySuccess
                ? "Copied!"
                : "Copy text",
              subtitle: copyError
                ? "An error has occurred"
                : copySuccess
                ? "Check your clipboard"
                : undefined,
              action: onTryCopy,
              flColor: colors.primary,
              skColor: colors.none,
              bgColor: copyError
                ? colors.red
                : copySuccess
                ? colors.green
                : colors.blue
            },
          ]}
        />
      </Modal>
    </>
  );
}
