"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "../molecule/Modal";
import { FormField } from "../molecule/FormField";
import { Button } from "../atom/Button";
import { BoardType, CreateBoard, UpdateBoard } from "@/interfaces/Board";

interface BoardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBoard | UpdateBoard) => Promise<void>;
  initialData?: {
    title: string;
    content: string;
    boardType: BoardType;
  };
  mode?: "create" | "edit";
}

export const BoardFormModal: React.FC<BoardFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 게시글 타입을 "문의"로 고정
  const boardType: BoardType = "QNA";

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setContent(initialData.content);
      } else {
        setTitle("");
        setContent("");
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await onSubmit({ boardType, title, content });
      } else {
        await onSubmit({ title, content });
      }
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
      title={mode === "create" ? "게시글 작성" : "게시글 수정"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "처리 중..." : mode === "create" ? "작성" : "수정"}
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
            placeholder="제목을 입력하세요"
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
            placeholder="내용을 입력하세요"
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 focus:border-[#00a651] resize-none transition-all bg-white text-gray-900 placeholder:text-gray-400"
            required
          />
        </div>
      </form>
    </Modal>
  );
};



