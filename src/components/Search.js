import React, { useEffect, useState } from "react";
import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useOutsideClick from "../hooks/useOutsideClick";
import ReservationInfo from "./ReservationInfo";

const Search = (props) => {
  const {
    setIsReservationInfoVisible,
    apartments,
    apartmentsChanged,
    setApartmentsChanged,
    setReservationInfo,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const [suggestionsArray, setSuggestionsArray] = useState([]);
  const [duplicateArray, setDuplicateArray] = useState([]);

  const [reservations, setReservations] = useState([]);

  const handleOutsideClick = () => {
    setSearchValue("");
    setSuggestionsArray([]);
  };

  const containerRef = useOutsideClick(handleOutsideClick);

  const handleSearch = () => {
    if (!reservations) return;
    setSuggestionsArray([]);
    const searchValueArray = Array.from(searchValue.toLowerCase());

    let temp = new Array();
    let temp2 = new Array();

    reservations.forEach((el, index) => {
      const currentStringArray = Array.from(el.guestName.toLowerCase());
      if (currentStringArray.length < 1) return;
      let weightFactor = 0;

      if (searchValueArray.length > 1) {
        currentStringArray.forEach((csa, csaIndex) => {
          // let trueArray = Array.apply(null, Array(searchValueArray.length)).map(
          //   (m) => false
          // );
          searchValueArray.forEach((sva, svaIndex) => {
            if (csaIndex + svaIndex > currentStringArray.length - 1) return;
            if (sva === currentStringArray[csaIndex + svaIndex]) {
              weightFactor++;
            } else {
              weightFactor = -100000; // lol wtf but it works.. i think weightfactor gets incremented too much when there is a word with repeating pattern...
              return;
            }

            if (
              weightFactor == searchValueArray.length &&
              !temp.find(
                (x) => x.guestName.toLowerCase() === el.guestName.toLowerCase()
              )
            ) {
              temp = [...temp, el];
            } else if (
              weightFactor == searchValueArray.length &&
              temp.find(
                (x) => x.guestName.toLowerCase() === el.guestName.toLowerCase()
              )
            ) {
              temp2 = [...temp2, el];
            }
          });

          setSuggestionsArray([...temp]);
          setDuplicateArray([...temp2]);

          // suggestionsArray.length < 1
          //   ? setSuggestionsArray([...temp])
          //   : suggestionsArray.forEach((sa, indx) => {
          //       if (sa.index === index) {
          //         if (sa.weight < weightFactor) {
          //           setSuggestionsArray([...temp]);
          //           console.log(temp);
          //         } else return;
          //       } else {
          //         setSuggestionsArray([...temp]);
          //       }
          //     });
        });
      }
    });
  };

  const findReservations = () => {};

  const handleItemClick = (item) => {
    setReservationInfo({ label: item.apName, index: 0, reservation: item });
    setSearchValue("");
    setSuggestionsArray([]);
    setIsReservationInfoVisible(true);
    console.log(item);
  };

  useEffect(() => {
    let temp = new Array();
    apartments.forEach((ap) => {
      const res = Array.from(ap.reservations);
      res.forEach((r) => {
        r.apName = ap.label;
        temp = [...temp, r];
      });
      setReservations([...temp]);
    });
  }, [apartments]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  useEffect(() => {
    console.log(suggestionsArray);
  }, [suggestionsArray]);
  return (
    <>
      <div id="reservationInfoStyleCorrection"></div>
      <div ref={containerRef} id="searchContainer">
        <div id="searchTextIcon">
          <p id="searchParagraph">Search</p>
        </div>

        <input
          autoComplete="off"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          id="searchInput"
        ></input>
        <div id="suggestionDisplay">
          {suggestionsArray.map((sa, index) => {
            return (
              <div
                onClick={() => handleItemClick(sa)}
                className="searchItem"
                key={`${index + 1}${sa}${index + 477}`}
              >
                {sa.guestName}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
