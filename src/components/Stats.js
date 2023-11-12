import React, { useState, useEffect } from "react";
import "../styles/Stats.css";
import AppHeader from "./AppHeader";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import GeneralStats from "./GeneralStats";
import ApartmentStatsHeader from "./ApartmentStatsHeader";
import ApartmentStatsBody from "./ApartmentStatsBody";
import StatsHeader from "./StatsHeader";

const Stats = () => {
  const axiosPrivate = useAxiosPrivate();

  const [apartments, setApartments] = useState([]);
  const [totalStats, setTotalStats] = useState([]);
  const [lastRowStats, setLastRowStats] = useState([]); //lol
  const [yearCondition, setYearCondition] = useState("alltime");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getApartments = async () => {
      try {
        const id = "Jure"; //auth.user
        const response = await axiosPrivate.get(`/users/${id}`, {
          signal: controller.signal,
        });
        const apartmentsArray = response.data.apartments;
        setApartments([...apartmentsArray]);
      } catch (err) {
        console.error(err);
      }
    };

    getApartments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div id="statsContainer">
      <AppHeader />
      <StatsHeader
        apartments={apartments}
        setYearCondition={setYearCondition}
      />
      <GeneralStats
        apartments={apartments}
        yearCondition={yearCondition}
        setLastRowStats={setLastRowStats}
      />
      <ApartmentStatsHeader
        totalStats={totalStats}
        setTotalStats={setTotalStats}
      />
      <ApartmentStatsBody
        apartments={apartments}
        totalStats={totalStats}
        setTotalStats={setTotalStats}
        yearCondition={yearCondition}
        lastRowStats={lastRowStats}
      />
    </div>
  );
};

export default Stats;
