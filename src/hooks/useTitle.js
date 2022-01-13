import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Hello World | ${title}`;
  });
};

export default useTitle;
