import { useCallback, useEffect, useState } from "react";

export function withMousePosition(WrappedComponent) {
  return function (props) {
    const [x, setX] = useState();
    const [y, setY] = useState();

    const onMouseMove = useCallback((e) => {
      setX(e.clientX);
      setY(e.clientY);
    }, []);

    useEffect(() => {
      window.addEventListener("mousemove", onMouseMove);

      return () => window.removeEventListener("mousemove", onMouseMove);
    }, [onMouseMove]);

    return <WrappedComponent {...props} x={x} y={y} />;
  };
}
