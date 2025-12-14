"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "../molecule/Modal";
import { FormField } from "../molecule/FormField";
import { Button } from "../atom/Button";

interface StationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { boardType: "REPORT"; title: string; content: string }) => Promise<void>;
  stationName: string;
  stationAddress: string;
  capacity: number;
  availableBikes: number;
}

export const StationReportModal: React.FC<StationReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  stationName,
  stationAddress,
  capacity,
  availableBikes,
}) => {
  const [additionalContent, setAdditionalContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAdditionalContent("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 제목 자동 생성
    const title = `[${stationName}] 고장 신고`;

    // 내용 자동 생성 (대여소 정보 포함)
    const baseContent = `대여소: ${stationName}
주소: ${stationAddress}
수용 대수: ${capacity}대
가능 대수: ${availableBikes}대`;

    const content = additionalContent.trim()
      ? `${baseContent}\n\n추가 내용:\n${additionalContent}`
      : baseContent;

    setIsSubmitting(true);
    try {
      await onSubmit({
        boardType: "REPORT",
        title,
        content,
      });
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="고장 신고"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "처리 중..." : "신고하기"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="bg-gray-50 p-4 rounded-xl mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">대여소 정보</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">대여소명:</span> {stationName}</p>
              <p><span className="font-medium">주소:</span> {stationAddress}</p>
              <p><span className="font-medium">수용 대수:</span> {capacity}대</p>
              <p><span className="font-medium">가능 대수:</span> {availableBikes}대</p>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            추가 내용 (선택사항)
          </label>
          <textarea
            value={additionalContent}
            onChange={(e) => setAdditionalContent(e.target.value)}
            placeholder="고장 내용이나 추가 설명을 입력해주세요"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 focus:border-[#00a651] resize-none transition-all bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </form>
    </Modal>
  );
};

