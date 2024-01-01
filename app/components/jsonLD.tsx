"use client";

import React, { useState, useEffect } from "react";

interface JsonLDProps {
  data: Record<string, any>;
}

const JsonLD: React.FC<JsonLDProps> = ({ data }) => {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const updatedData = { ...data };

  if (updatedData.url && typeof updatedData.url === "string") {
    updatedData.url = `${origin}${updatedData.url}`;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(updatedData) }}
    />
  );
};

export default JsonLD;
