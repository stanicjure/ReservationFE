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
    setSearchValue("");
    setSuggestionsArray([]);
  };

  const containerRef = useOutsideClick(handleOutsideClick);

  const handleSearch = () => {
    console.log("setting empty");
    setSuggestionsArray([]);
    const searchValueArray = Array.from(searchValue.toLowerCase());

    let temp = new Array();

    namesArray.forEach((el, index) => {
      const currentStringArray = Array.from(el.name);
      if (currentStringArray.length < 1) return;
      const currentApartmentName = el.label;
      let weightFactor = 0;

      if (searchValueArray.length > 1) {
        currentStringArray.forEach((csa, csaIndex) => {
          // let trueArray = Array.apply(null, Array(searchValueArray.length)).map(
          //   (m) => false
          // );
          searchValueArray.forEach((sva, svaIndex) => {
            if (sva == currentStringArray[csaIndex + svaIndex]) {
              weightFactor++;
            } else {
              weightFactor = 0;
              return;
            }

            if (weightFactor == searchValueArray.length) {
              temp = [
                ...temp,
                {
                  index: index,
                  label: currentApartmentName,
                  weight: weightFactor,
                  name: el.name,
                },
              ];
            }
          });

          setSuggestionsArray([...temp]);

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

  useEffect(() => {
    let temp = new Array();
    apartments.forEach((ap) => {
      const reservations = Array.from(ap.reservations);
      reservations.forEach((r) => {
        temp = [...temp, { label: ap.label, name: r.guestName.toLowerCase() }];
      });
      setNamesArray([...temp]);
    });

    console.log(namesArray);
  }, [apartments]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  useEffect(() => {
    console.log(suggestionsArray);
  }, [suggestionsArray]);
  return (
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
            <div className="searchItem" key={`${index + 1}${sa}${index + 477}`}>
              {sa.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
