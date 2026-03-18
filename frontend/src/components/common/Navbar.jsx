import { Link } from "react-router-dom";
import Button from "./Button";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[100] px-4 py-3 shadow-sm md:px-5 bg-lightTheme">
      {/* desktop navbar */}
      <div className="hidden max-w-7xl mx-auto md:flex items-center justify-between">
        <div className="flex cursor-pointer items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-buttonBlue text-2xl lg:h-11 lg:w-11">
            <img src="/public/logo-no-bg.png" alt="logo" />
          </div>
          <span className="text-xl text-textBlue font-bold tracking-[-0.4px] text-[var(--text-h)] md:text-xl">
            MediQueue
          </span>
        </div>
        <div className="flex font-semibold items-center gap-8 text-[var(--text)]">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Button
            to="/login"
            title="Login"
            className={`bg-transparent text-buttonBlue border border-buttonBlue hover:bg-buttonBlue hover:text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 duration-200`}
          />
          <Button
            to="/register"
            title="Register"
            className={`bg-buttonBlue text-white hover:bg-[#2a3db0] font-semibold py-2 px-4 rounded-lg flex items-center gap-2 duration-200`}
          />
        </div>
      </div>
      {/* mobile navbar */}
      <div className="mx-auto flex w-full items-center justify-between md:hidden">
        <div className="flex cursor-pointer items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-buttonBlue text-2xl lg:h-11 lg:w-11">
            <img src="/public/logo-no-bg.png" alt="logo" />
          </div>
          <span className="text-xl font-semibold tracking-[-0.4px] text-[var(--text-h)] lg:text-xl">
            MediQueue
          </span>
        </div>

        <button
          className="-m-2 flex cursor-pointer flex-col gap-[5px] border-none bg-transparent p-2"
          aria-label="Toggle menu"
          type="button"
        >
          <span className="block h-[2.5px] w-6 rounded bg-[var(--text-h)] transition-colors duration-300 hover:bg-[var(--accent)]"></span>
          <span className="block h-[2.5px] w-6 rounded bg-[var(--text-h)] transition-colors duration-300 hover:bg-[var(--accent)]"></span>
          <span className="block h-[2.5px] w-6 rounded bg-[var(--text-h)] transition-colors duration-300 hover:bg-[var(--accent)]"></span>
        </button>
      </div>
    </nav>
  );
};
