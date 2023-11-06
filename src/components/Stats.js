import React, { useState, useEffect } from "react";
import "../styles/Stats.css";
import AppHeader from "./AppHeader";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import GeneralStats from "./GeneralStats";
import ApartmentStatsHeader from "./ApartmentStatsHeader";
import ApartmentStatsBody from "./ApartmentStatsBody";

const Stats = () => {
  const axiosPrivate = useAxiosPrivate();

  const [apartments, setApartments] = useState([]);
  const [totalStats, setTotalStats] = useState([]);

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
      <GeneralStats apartments={apartments} />
      <ApartmentStatsHeader
        totalStats={totalStats}
        setTotalStats={setTotalStats}
      />
      <ApartmentStatsBody
        apartments={apartments}
        totalStats={totalStats}
        setTotalStats={setTotalStats}
      />
    </div>
  );
};

export default Stats;
