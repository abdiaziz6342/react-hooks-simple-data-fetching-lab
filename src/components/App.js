import React, { useEffect, useState } from "react";

function App() {
  const [dogImage, setDogImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch a dog image.");
        }

        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setDogImage(data.message);
        }
      })
      .catch((fetchError) => {
        if (isMounted) {
          setError(fetchError.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!dogImage) {
    return <p>Loading...</p>;
  }

  return <img src={dogImage} alt="A Random Dog" />;
}

export default App;
