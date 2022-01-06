import React from "react";
import { NavLink } from "react-router-dom";

// css
import "./Header.css";

const Header = ({
  searchSource,
  toggleSearch,
  searchedValue,
  setSearchedValue,
  handleToggleSearch,
  handleFilterEmployeeContainer,
}) => {
  return (
    <div>
      {/* HEADER */}
      <section className="employee_Header">
        {/* SEARCH AND REFRESH CONTAINER */}
        <section className="search_Refresh_Container">
          {/* SEARCH */}
          <section
            className={
              toggleSearch ? "toggle_Search_Employee" : "search_Employee"
            }
          >
            <section className="search_Icon" onClick={handleToggleSearch}>
              {toggleSearch ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-search"></i>
              )}
            </section>
            <input
              type="text"
              name="search"
              placeholder="Name or id"
              onChange={(e) => setSearchedValue(e.target.value)}
            />
            {/* SEARCHED RESULT */}
            <section className="searched_Results">
              {/* SEARCHED VALUE IS EMPTY */}
              {!searchedValue ? (
                <section className="no_Matching_Results">
                  No matching results!
                </section>
              ) : // SEACHED VALUE HAS NO MATCHED
              searchSource.filter((e) => {
                  const details = `${e.lastname} ${e.firstname} ${e.employee_id}`;
                  return details
                    .toLowerCase()
                    .includes(searchedValue.toLowerCase());
                }).length < 1 ? (
                <section className="no_Matching_Results">
                  No matching results!
                </section>
              ) : (
                // SEARCHED VALUE HAS A MATCH
                searchSource
                  .filter((e) => {
                    const details = `${e.lastname} ${e.firstname} ${e.employee_id}`;
                    return details
                      .toLowerCase()
                      .includes(searchedValue.toLowerCase());
                  })
                  .map((e) => {
                    return (
                      <section
                        key={e.employee_id}
                        className="results"
                        onClick={handleFilterEmployeeContainer}
                      >
                        <h4>{`${e.lastname}, ${e.firstname} ${e.middle}.`}</h4>
                        <span>{e.employee_id}</span>
                      </section>
                    );
                  })
              )}
            </section>
          </section>
          {/* REFRESH */}
          <section className="refresh_Page">
            <button type="button" onClick={() => window.location.reload()}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </section>
        </section>
        {/* EMPLOYEE LINKS */}
        <section className="employee_Links_Container">
          <ul>
            <li>
              <NavLink
                exact
                className="link"
                activeClassName="selected"
                to="/Employee"
              >
                Employee
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className="link"
                activeClassName="selected"
                to="/Employee/Blacklist"
              >
                Blacklisted
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className="link"
                activeClassName="selected"
                to="/Employee/Terminated"
              >
                Terminated
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className="link"
                activeClassName="selected"
                to="/Employee/Resigned"
              >
                Resigned
              </NavLink>
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default Header;
