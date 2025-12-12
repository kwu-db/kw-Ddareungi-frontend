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
  const [boardType, setBoardType] = useState<BoardType>("QNA");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setContent(initialData.content);
        setBoardType(initialData.boardType);
      } else {
        setTitle("");
        setContent("");
        setBoardType("QNA");
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
        {mode === "create" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              게시글 타입
            </label>
            <select
              value={boardType}
              onChange={(e) => setBoardType(e.target.value as BoardType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a651]"
              required
            >
              <option value="QNA">문의</option>
              <option value="NOTICE">공지</option>
              <option value="REPORT">신고</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <FormField
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a651] resize-none"
            required
          />
        </div>
      </form>
    </Modal>
  );
};

