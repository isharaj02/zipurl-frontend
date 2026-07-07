import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
        Shorten URLs.
        <br />
        Track Analytics.
        <br />
        Share Smarter.
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
        Create short links, monitor clicks, and manage all your URLs
        from a clean and modern dashboard.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="rounded-lg border px-6 py-3"
        >
          Login
        </Link>
      </div>
    </section>
  );
}

export default HomePage;