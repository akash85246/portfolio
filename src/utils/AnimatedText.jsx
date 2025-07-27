import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AnimatedTextLine({
  text,
  startDelay = 0,
  typingSpeed = 10,
  className = "",
}) {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isLoading) {
      setDisplayedText("");
      return;
    }

    let timeoutId;
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeText, typingSpeed);
      }
    };

    const delayTimer = setTimeout(typeText, startDelay * typingSpeed);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(delayTimer);
    };
  }, [isLoading, text, startDelay, typingSpeed]);

  return (
    <div className={`${className}`}>
      {displayedText}
    </div>
  );
}

export default AnimatedTextLine;