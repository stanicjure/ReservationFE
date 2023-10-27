import React from "react";
import { ResevationForm } from "./ResevationForm";

export const ParentComponent = () => {
  const apartments = ["AP-3", "AP-4", "AP-5", "AP-7", "AP-8", "AP-12"];
  return (
    <div>
      <ResevationForm apartments={apartments}></ResevationForm>
    </div>
  );
};
