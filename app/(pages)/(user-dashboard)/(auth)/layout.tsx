export default function layout({ children }: { children: React.ReactNode }) {
  return <div>   <div className="flex sm:flex-row flex-col justify-center items-center w-full">
  <img
    draggable="false"
    src="/images/signin.jpg"
    className="w-[50%] sm:block hidden h-screen object-cover object-center "
    alt=""
  />
  <div
    className="flex min-h-[90vh] sm:w-[50%] w-full flex-col justify-center px-6 py-12 lg:px-8 "
    id="signInDiv"
  >{children}</div></div></div>;
}
