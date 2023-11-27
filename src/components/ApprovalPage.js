import React from "react";
import Title from "./Title";
import "../styles/ApprovalPage.css";

const ApprovalPage = () => {
  return (
    <div id="approvalPageContainer">
      <Title />
      <div id="approvalPageContent">
        <h3>Waiting Admin Approval</h3>
        <p>
          Admin needs to confirm your account before you can start using this
          application.
        </p>
        <p>If your account is not confirmed in 24h send us a ticket.</p>
      </div>
      <div id="approvalPageContentFooter">
        <button>Tickets</button>
        <button>Sign Out</button>
      </div>
    </div>
  );
};

export default ApprovalPage;
