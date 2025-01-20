import dynamic from 'next/dynamic';

function Container({ children }:{ children:React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

export const NoSSR = dynamic(() => Promise.resolve(Container), {
  ssr: false
});
