import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DueDateBadge = (props) => {
  if (props.date != null) {
    const currDate = new Date();
    const badgeType = props.date < currDate ? "danger" : "info";

    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(props.date).toLocaleString("pl-PL", options);
    return (
      <div>
        <span className={`badge badge-${badgeType}`}>
          <FontAwesomeIcon icon={faClock} />
          {date}
        </span>
      </div>
    );
  } else {
    return <></>;
  }
};

export default DueDateBadge;
