"use client";

import React from "react";

interface JsonLDProps {
  data: Record<string, any>;
}

const JsonLD: React.FC<JsonLDProps> = ({ data }) => {
  const updatedData = { ...data };

  if (updatedData.url && typeof updatedData.url === "string") {
    updatedData.url = `${window.location.origin}${updatedData.url}`;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(updatedData) }}
    />
  );
};

export default JsonLD;
