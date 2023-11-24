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
    setReservationInfo,
    allFoundItemsArray,
    setAllFoundItemsArray,
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

  //cleanup
  const findReservations = () => {};

  const handleItemClick = (item) => {
    // only now create array of found items (duplicates + clicked item)
    // sort it also

    if (duplicateArray.length === 0) {
      setAllFoundItemsArray([item]);
      return;
    }

    // if there is only one name then there can be duplicate array composed from other names
    if (item.guestName !== duplicateArray[0].guestName) {
      setAllFoundItemsArray([item]);
      return;
    }

    let temp = new Array();
    temp = [item, ...duplicateArray];
    temp.sort((a, b) => {
      const start = new Date(a.start);
      const end = new Date(a.end);
      if (start.getTime() > end.getTime()) {
        return 1;
      } else if (start.getTime() < end.getTime()) {
        return -1;
      } else return 0;
    });
    setAllFoundItemsArray([...temp]);
    //
  };

  useEffect(() => {
    let temp = new Array();
    apartments.forEach((ap) => {
      const res = Array.from(ap.reservations);
      res.forEach((r, index) => {
        r.apName = ap.label;
        r.index = index;
        temp = [...temp, r];
      });
      setReservations([...temp]);
    });
  }, [apartments]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  useEffect(() => {
    if (allFoundItemsArray.length === 0) return;
    setReservationInfo({
      label: allFoundItemsArray[0].apName,
      index: 0,
      reservation: allFoundItemsArray[0],
    });

    setSearchValue("");
    setSuggestionsArray([]);
    setIsReservationInfoVisible(true);
  }, [allFoundItemsArray]);
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
