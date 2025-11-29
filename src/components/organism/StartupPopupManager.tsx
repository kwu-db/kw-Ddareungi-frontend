"use client";

import { useEffect, useState } from "react";
import { StartupPopup } from "@/components/molecule/StartupPopup";

const POPUP_STORAGE_KEY = "startupPopupLastShown";
const POPUP_INTERVAL_DAYS = 7; // 7일마다 한 번씩 보여주기

export const StartupPopupManager: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkShouldShowPopup = () => {
      const lastShown = localStorage.getItem(POPUP_STORAGE_KEY);
      
      if (!lastShown) {
        // 처음 방문하는 경우
        setShowPopup(true);
        return;
      }

      const lastShownDate = new Date(lastShown);
      const now = new Date();
      const daysDiff = Math.floor(
        (now.getTime() - lastShownDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // 7일 이상 지났으면 팝업 표시
      if (daysDiff >= POPUP_INTERVAL_DAYS) {
        setShowPopup(true);
      }
    };

    checkShouldShowPopup();
  }, []);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(POPUP_STORAGE_KEY, new Date().toISOString());
    }
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return <StartupPopup onClose={handleClose} />;
};

