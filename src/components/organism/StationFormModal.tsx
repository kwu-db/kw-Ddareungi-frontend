"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Modal } from "../molecule/Modal";
import { FormField } from "../molecule/FormField";
import { Button } from "../atom/Button";
import { RequestRegisterStation, UpdateStation, ResponseStation } from "@/interfaces/Station";

// 지도 컴포넌트는 클라이언트 사이드에서만 로드
const LocationPickerMap = dynamic(() => import("../molecule/LocationPickerMap"), {
  ssr: false,
});

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
  const [latitude, setLatitude] = useState<number>(37.5665); // 서울시청 기본 위치
  const [longitude, setLongitude] = useState<number>(126.978);
  const [capacity, setCapacity] = useState("");
  const [closedHour, setClosedHour] = useState("");
  const [closedMinute, setClosedMinute] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setStationName(initialData.stationName);
        setLatitude(initialData.latitude);
        setLongitude(initialData.longitude);
        setCapacity(initialData.capacity.toString());
        if (initialData.closedDate) {
          setClosedHour(initialData.closedDate.hour.toString());
          setClosedMinute(initialData.closedDate.minute.toString());
        } else {
          setClosedHour("");
          setClosedMinute("");
        }
      } else {
        setStationName("");
        setLatitude(37.5665); // 서울시청 기본 위치
        setLongitude(126.978);
        setCapacity("");
        setClosedHour("");
        setClosedMinute("");
      }
    }
  }, [isOpen, initialData]);

  const handleLocationChange = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationName.trim() || !latitude || !longitude || !capacity) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const baseData: any = {
        stationName,
        latitude,
        longitude,
        address: "", // 주소는 지도에서 선택한 위치로 대체
        capacity: parseInt(capacity),
        installationDate: "", // 서버에서 자동 처리
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
            onChange={e => setStationName(e.target.value)}
            placeholder="대여소 이름을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            위치 선택 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">지도를 클릭하여 대여소 위치를 선택하세요</p>
          <LocationPickerMap latitude={latitude} longitude={longitude} onLocationChange={handleLocationChange} />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <FormField
            label="위도"
            type="number"
            step="any"
            value={latitude.toString()}
            onChange={e => setLatitude(parseFloat(e.target.value) || 0)}
            placeholder="위도"
            required
          />
          <FormField
            label="경도"
            type="number"
            step="any"
            value={longitude.toString()}
            onChange={e => setLongitude(parseFloat(e.target.value) || 0)}
            placeholder="경도"
            required
          />
        </div>
        <div className="mb-4">
          <FormField
            label="수용 대수"
            type="number"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
            placeholder="수용 대수"
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">마감 시간 (선택)</label>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="시"
              type="number"
              value={closedHour}
              onChange={e => setClosedHour(e.target.value)}
              placeholder="시"
              min="0"
              max="23"
            />
            <FormField
              label="분"
              type="number"
              value={closedMinute}
              onChange={e => setClosedMinute(e.target.value)}
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
