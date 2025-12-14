"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "../molecule/Modal";
import { FormField } from "../molecule/FormField";
import { Button } from "../atom/Button";
import { CreateBoard } from "@/interfaces/Board";

interface NoticeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBoard) => Promise<void>;
}

export const NoticeFormModal: React.FC<NoticeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setContent("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        boardType: "NOTICE",
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
      title="공지 작성"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "처리 중..." : "작성"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <FormField
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="공지 제목을 입력하세요"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="공지 내용을 입력하세요"
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 focus:border-[#00a651] resize-none transition-all bg-white text-gray-900 placeholder:text-gray-400"
            required
          />
        </div>
      </form>
    </Modal>
  );
};

