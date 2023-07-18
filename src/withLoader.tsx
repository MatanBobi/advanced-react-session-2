import { ReactElement, ReactInstance, useEffect, useState } from "react";

export function withLoader(
  Component: ({ data }: any) => ReactElement,
  url: string
) {
  return (props: any) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      let isMounted = true;

      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        if (!isMounted) return;
        setData(data);
      }

      getData();
      return () => {
        isMounted = false;
      };
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Component {...props} data={data} />;
  };
}
