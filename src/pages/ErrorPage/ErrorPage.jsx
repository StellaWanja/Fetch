import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="c-space min-h-screen w-full bg-white flex flex-col justify-center items-center gap-4">
      <h1 className="text-green text-6xl font-bold">Oops!</h1>
      <h3 className="text-green text-3xl font-medium text-center">
        We can&apos;t seem to find the page you&apos;re looking for.
      </h3>
      <p className="text-green font-bold text-xl">Error Code: 404</p>
      <Link
        to="/"
        className="text-green text-xl hover:text-neutral-600 transition ease-in delay-150"
      >
        Go Back to Home Page
      </Link>
    </section>
  );
};

export default ErrorPage;
