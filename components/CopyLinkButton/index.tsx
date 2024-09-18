"use client";
import { useState } from "react";
import { IoCheckmark, IoClose, IoShareOutline } from "react-icons/io5";

import { focusable } from "@/utils";
import { useToaster } from "@/providers/Toaster";

import colors from '@/styles/colors.module.scss';

interface CopyLinkButtonProps {
  id: number;
  activeClassName: string;
}

export function CopyLinkButton({ id, activeClassName }:CopyLinkButtonProps) {
  const toaster = useToaster();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onSuccess = () => {
    setShowSuccess(true);
    toaster.add({ message: "Link copied successfully", type: 'success' });
  };

  const onError = () => {
    setError(true);
    toaster.add({ message: "Link couldn't be copied", type: 'error' });
  };

  const onShare = () => {
    if (navigator.clipboard)
      navigator.clipboard.writeText(`${window.location.origin}/c/${id}`)
        .then(onSuccess)
        .catch(onError);
    else
      onError();

    setTimeout(() => {
      setShowSuccess(false);
      setError(false);
    }, 2000);
  };

  return (
    <div
      id={`share-post-${id}`}
      {...focusable(activeClassName, onShare)}
    >
      { error ? <IoClose color={colors.red} /> : showSuccess ? <IoCheckmark color={colors.green} /> : <IoShareOutline color={colors.quinary} /> }
    </div>
  );
}
