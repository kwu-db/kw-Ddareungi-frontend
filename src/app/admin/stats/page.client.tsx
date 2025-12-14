"use client";

import { StatsChart } from "@/components/organism/StatsChart";
import { useRentals } from "@/hooks/useRentals";
import { useTimeRankings, useCountRankings } from "@/hooks/useRentals";
import { usePasses } from "@/hooks/usePasses";
import { Card } from "@/components/atom/Card";

export default function AdminStatsPageClient() {
  const { data: rentals, isLoading: rentalsLoading } = useRentals();
  const { data: timeRankings, isLoading: timeRankingsLoading } = useTimeRankings(10);
  const { data: countRankings, isLoading: countRankingsLoading } = useCountRankings(10);
  const { data: passes, isLoading: passesLoading } = usePasses();

  // 대여소별 이용량 집계
  const stationUsage =
    rentals?.reduce((acc, rental) => {
      const stationName = rental.startStationName;
      if (!acc[stationName]) {
        acc[stationName] = 0;
      }
      acc[stationName]++;
      return acc;
    }, {} as Record<string, number>) || {};

  // 대여소별 이용량 TOP 5
  const topStations = Object.entries(stationUsage)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // 요일별 이용 현황 집계
  const dailyStats =
    rentals?.reduce((acc, rental) => {
      if (rental.startTime) {
        const date = new Date(rental.startTime);
        const dayOfWeek = date.getDay(); // 0: 일요일, 1: 월요일, ...
        const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
        const dayName = dayNames[dayOfWeek];

        if (!acc[dayName]) {
          acc[dayName] = 0;
        }
        acc[dayName]++;
      }
      return acc;
    }, {} as Record<string, number>) || {};

  // 요일 순서대로 정렬
  const dailyStatsOrdered = ["월", "화", "수", "목", "금", "토", "일"].map(day => ({
    label: day,
    value: dailyStats[day] || 0,
  }));

  // 이용권 유형별 분포
  const passDistribution =
    passes?.reduce((acc, pass) => {
      const passType = pass.passType;
      const typeNames: Record<string, string> = {
        ONE_DAY: "1일권",
        SEVEN_DAY: "7일권",
        THIRTY_DAY: "30일권",
        YEAR: "연간권",
      };
      const typeName = typeNames[passType] || passType;

      if (!acc[typeName]) {
        acc[typeName] = 0;
      }
      acc[typeName]++;
      return acc;
    }, {} as Record<string, number>) || {};

  const passDistributionData = Object.entries(passDistribution).map(([label, value]) => ({
    label,
    value,
  }));

  // 이용시간 랭킹 데이터 변환
  const timeRankingsData =
    timeRankings?.slice(0, 5).map(ranking => {
      // API 응답에 hours, minutes, seconds가 있으면 사용, 없으면 value를 초 단위로 가정하여 변환
      let hours = ranking.hours ?? 0;
      let minutes = ranking.minutes ?? 0;
      let seconds = ranking.seconds ?? 0;

      // hours/minutes/seconds가 모두 0이고 value가 있으면 value를 초 단위로 가정하여 변환
      if (hours === 0 && minutes === 0 && seconds === 0 && ranking.value > 0) {
        const totalSeconds = ranking.value;
        hours = Math.floor(totalSeconds / 3600);
        minutes = Math.floor((totalSeconds % 3600) / 60);
        seconds = totalSeconds % 60;
      }

      // "땡 시간 땡 분 땡 초" 형식으로 변환
      const timeString = `${hours}시간 ${minutes}분 ${seconds}초`;

      // 차트 비교를 위한 값 (초 단위로 통일)
      const totalSecondsForChart = hours * 3600 + minutes * 60 + seconds || ranking.value;

      return {
        label: ranking.userName || `사용자 ${ranking.userId}`,
        value: totalSecondsForChart, // 차트 표시용 (비교를 위해 초 단위 유지)
        displayValue: timeString, // 표시용 텍스트
      };
    }) || [];

  // 이용횟수 랭킹 데이터 변환
  const countRankingsData =
    countRankings?.slice(0, 5).map(ranking => ({
      label: ranking.userName || `사용자 ${ranking.userId}`,
      value: ranking.value,
    })) || [];

  const isLoading = rentalsLoading || timeRankingsLoading || countRankingsLoading || passesLoading;

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-medium">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <StatsChart title="대여소별 이용량 TOP 5" data={topStations} type="bar" />
      <StatsChart title="요일별 이용 현황" data={dailyStatsOrdered} type="line" />
      <StatsChart title="이용시간 랭킹 TOP 5" data={timeRankingsData} type="bar" />
      <StatsChart title="이용횟수 랭킹 TOP 5" data={countRankingsData} type="bar" />
      {/* {passDistributionData.length > 0 && (
        <StatsChart title="이용권 유형별 분포" data={passDistributionData} type="pie" />
      )} */}
    </div>
  );
}
