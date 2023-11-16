import React, { useEffect, useState } from "react";
import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useOutsideClick from "../hooks/useOutsideClick";

const Search = (props) => {
  const { apartments } = props;
  const [searchValue, setSearchValue] = useState("");
  const [suggestionsArray, setSuggestionsArray] = useState([]);

  const [namesArray, setNamesArray] = useState([]);

  const handleOutsideClick = () => {
    console.log("outsideClick");
  };

  const containerRef = useOutsideClick(handleOutsideClick);

  const handleSearch = () => {
    setSuggestionsArray([]);
    const searchValueArray = Array.from(searchValue.toLowerCase());
    namesArray.forEach((el) => {
      const currentStringArray = Array.from(el.name);
      const currentApartmentName = el.label;

      if (searchValueArray.length > 1)
        currentStringArray.forEach((current, index) => {
          if (
            current === searchValueArray[0] &&
            currentStringArray[index + 1] === searchValueArray[1]
          ) {
            let weightFactor = 0;
            let searchIndex = 2;
            for (let i = index + 2; i < currentStringArray.length; i++) {
              if (currentStringArray[i] === searchValue[searchIndex]) {
                weightFactor++;
                searchIndex++;
              }
            }

            let temp = [
              ...suggestionsArray,
              {
                label: currentApartmentName,
                weight: weightFactor,
                name: el.name,
              },
            ];
            setSuggestionsArray([...temp]);
          }
        });
    });
  };

  useEffect(() => {
    let temp = new Array();
    apartments.forEach((ap) => {
      const reservations = Array.from(ap.reservations);
      reservations.forEach((r) => {
        temp = [...temp, { label: ap.label, name: r.guestName.toLowerCase() }];
      });
      setNamesArray([...temp]);
    });
  }, [apartments]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  useEffect(() => {
    console.log(suggestionsArray);
  }, [suggestionsArray]);
  return (
    <div ref={containerRef} id="searchContainer">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <p id="searchParagraph">Search</p>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id="searchInput"
      ></input>
    </div>
  );
};

export default Search;
