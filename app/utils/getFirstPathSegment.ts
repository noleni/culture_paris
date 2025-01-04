  export const getFirstPathSegment = (pathname : string) => {
    if (!pathname) return null;
    const segments = pathname.split("/").filter(Boolean);
    return segments[0];
  };
