import React from "react";

type GoogleImageProps = {
  driveUrl?: string;
  alt?: string;
};

const GoogleImage: React.FC<GoogleImageProps> = ({ driveUrl, alt = "" , className = ""}) => {
  const getDirectLink = (url?: string) => {
    if (!url || typeof url !== "string") return "";

    const regex = /\/d\/([^/]+)/;
    const match = url.match(regex);

    if (match?.[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }

    return url;
  };

  const src = getDirectLink(driveUrl);

  if (!src) return null; // prevents broken image render

  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};

export default GoogleImage;
