import React, { memo, useEffect } from "react";

const Loading: React.FC = () => {
  useEffect(() => {
    console.log("Suspense Loading mounted");
  }, []);
  return (
    <div className="grid h-screen w-screen place-items-center">
      <h1 className="h1-md">Loading...</h1>
    </div>
  );
};

export default memo(Loading);
