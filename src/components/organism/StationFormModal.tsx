"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "../molecule/Modal";
import { FormField } from "../molecule/FormField";
import { Button } from "../atom/Button";
import {
  RequestRegisterStation,
  UpdateStation,
  ResponseStation,
} from "@/interfaces/Station";

interface StationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RequestRegisterStation | UpdateStation) => Promise<void>;
  initialData?: ResponseStation;
  mode?: "create" | "edit";
}

export const StationFormModal: React.FC<StationFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}) => {
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [capacity, setCapacity] = useState("");
  const [installationDate, setInstallationDate] = useState("");
  const [closedHour, setClosedHour] = useState("");
  const [closedMinute, setClosedMinute] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setStationName(initialData.stationName);
        setAddress(initialData.address);
        setLatitude(initialData.latitude.toString());
        setLongitude(initialData.longitude.toString());
        setCapacity(initialData.capacity.toString());
        setInstallationDate(initialData.installationDate);
        if (initialData.closedDate) {
          setClosedHour(initialData.closedDate.hour.toString());
          setClosedMinute(initialData.closedDate.minute.toString());
        } else {
          setClosedHour("");
          setClosedMinute("");
        }
      } else {
        setStationName("");
        setAddress("");
        setLatitude("");
        setLongitude("");
        setCapacity("");
        setInstallationDate(new Date().toISOString().split("T")[0]);
        setClosedHour("");
        setClosedMinute("");
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationName.trim() || !address.trim() || !latitude || !longitude || !capacity) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const baseData: any = {
        stationName,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        capacity: parseInt(capacity),
        installationDate,
      };

      if (closedHour && closedMinute) {
        baseData.closedDate = {
          hour: parseInt(closedHour),
          minute: parseInt(closedMinute),
          second: 0,
          nano: 0,
        };
      }

      await onSubmit(baseData);
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
      title={mode === "create" ? "대여소 등록" : "대여소 수정"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "처리 중..." : mode === "create" ? "등록" : "수정"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormField
            label="대여소 이름"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            placeholder="대여소 이름을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <FormField
            label="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="주소를 입력하세요"
            required
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <FormField
            label="위도"
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="위도"
            required
          />
          <FormField
            label="경도"
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="경도"
            required
          />
        </div>
        <div className="mb-4">
          <FormField
            label="수용 대수"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="수용 대수"
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <FormField
            label="설치일"
            type="date"
            value={installationDate}
            onChange={(e) => setInstallationDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            마감 시간 (선택)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="시"
              type="number"
              value={closedHour}
              onChange={(e) => setClosedHour(e.target.value)}
              placeholder="시"
              min="0"
              max="23"
            />
            <FormField
              label="분"
              type="number"
              value={closedMinute}
              onChange={(e) => setClosedMinute(e.target.value)}
              placeholder="분"
              min="0"
              max="59"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

