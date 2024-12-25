"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoInformationCircle } from "@icons/io5/IoInformationCircle";
import { IoEllipsisVerticalOutline } from "@icons/io5/IoEllipsisVerticalOutline";
import { IoEllipsisHorizontalOutline } from "@icons/io5/IoEllipsisHorizontalOutline";
import { IoCopy } from "@icons/io5/IoCopy";
import { IoTrash } from "@icons/io5/IoTrash";
import { IoCloseCircle } from "@icons/io5/IoCloseCircle";
import { IoCheckmarkCircle } from "@icons/io5/IoCheckmarkCircle";

import { api, focusable } from "@/utils/client";
import { Modal } from "@/providers/ModalProvider";
import { useToaster } from "@/providers/Toaster";
import { OptionsModal } from "@/components/Modals";
import { LoadingText } from "@/components/LoadingText";

import colors from "@/styles/colors.js";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/supabase/client";

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
  const router = useRouter();
  const showOptionsState = useState<boolean>(false);

  const { data:ownerCheck, isLoading } = useQuery({
    queryKey: ['is-owner', props.id],
    queryFn: async () => {
      const supabase = createClient();
      const { data:s } = await supabase.auth.getSession();
      const { data:card } = await supabase
        .from('posts')
        .select('*')
        .eq('id', props.id)
        .single();

      return s.session?.user.id === card?.author_uuid;
    },
  });

  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<boolean>(false);

  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  const onCopySuccess = () => {
    setCopySuccess(true);
    toaster.add({ message: "Card text copied successfully", type: 'success' });
  };

  const onCopyError = () => {
    setCopyError(true);
    toaster.add({ message: "Card text couldn't be copied", type: 'error' });
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

  const onTryDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    showOptionsState[1](false);
    const res = await api("/mut/card/delete", { id: props.id });

    if (res.data) {
      router.refresh();
      toaster.add({ message: "Post deleted", type: 'success' });
    } else {
      toaster.add({ message: "Could not delete post...", type: 'error' });
    }
  };

  const s = showOptionsState[0];

  useEffect(() => {
    if (!s)
      setDeleteConfirm(false);
  }, [s]);

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
            {
              title: <LoadingText compact />,
              condition: isLoading
            },
            {
              icon: IoTrash,
              title: deleteConfirm ? "Are you sure?" : "Delete",
              subtitle: deleteConfirm ? "We might be losing a gem." : "IRREVERSIBLE",
              action: onTryDelete,
              flColor: deleteConfirm ? colors.red : colors.primary,
              skColor: colors.none,
              bgColor: deleteConfirm ? colors.primary : colors.red,
              condition: ownerCheck
            },
          ]}
        />
      </Modal>
    </>
  );
}
