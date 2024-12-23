import React from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [query] = useSearchParams();
  return <div>Payment Success: {query && query.get("payment_id")}</div>;
};

export default Success;
