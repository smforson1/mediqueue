import "./App.css";
import Button from "./components/common/Button";
import {
  FiCalendar,
  FiCheckCircle,
  FiPlayCircle,
  FiSearch,
  FiShield,
} from "react-icons/fi";
import { RiTicket2Line } from "react-icons/ri";

function App() {
  return (
    <main className="w-full bg-[#f7f9ff] text-left">
      <section className=" max-w-7xl mx-auto grid w-full gap-10 px-4 pb-14 pt-8 md:grid-cols-2 md:px-8 md:pb-20 md:pt-14">
        <div className="flex flex-col justify-center">
          <span className="mb-6 w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-primary">
            The Future of Healthcare Booking
          </span>

          <h1 className="m-0 text-4xl font-bold leading-tight tracking-[-0.02em] text-slate-900 md:text-6xl">
            Smart Clinic
            <br />
            Bookings, <span className="text-primary">Simplified</span>
          </h1>

          <p className="mt-6 max-w-[560px] text-lg leading-8 text-slate-600 md:text-xl">
            Say goodbye to long queues and paper logs. Manage your medical
            appointments effortlessly with our intuitive digital queuing system.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              title="Book an Appointment Now"
              className="rounded-lg bg-[#58b7de] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#47a8cf]"
            />

            <Button
              title="See how it works"
              variant="ghost"
              className="px-2 py-2 text-base font-medium text-slate-600 hover:bg-transparent"
              leftIcon={<FiPlayCircle className="text-lg text-slate-500" />}
            />
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-[#e8eefc] text-[10px] font-bold text-slate-600">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-[#fcefcf] text-[10px] font-bold text-slate-600">
                <img
                  src="https://images.pexels.com/photos/1133742/pexels-photo-1133742.jpeg"
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-[#d6f4e6] text-[10px] font-bold text-slate-600">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
            </div>
            <span>Trusted by 10,000+ patients</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-[600px] max-h-[540px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_18px_40px_-20px_rgba(44,84,170,0.45)]">
            <img
              src="https://images.pexels.com/photos/5452202/pexels-photo-5452202.jpeg"
              alt="Doctor ready to assist with digital appointment bookings"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_16px_26px_-18px_rgba(15,23,42,0.6)] md:left-8">
            <span className="rounded-full bg-emerald-100 p-2 text-emerald-600">
              <FiCheckCircle className="text-base" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Appointment Confirmed
              </p>
              <p className="text-xs text-slate-500">Today at 10:00 AM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#42b6de]">
            Simple Process
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold text-slate-900 md:text-5xl">
            How MediQueue Works
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-base text-slate-500 md:text-lg">
            Book your next visit in four simple steps and skip the waiting room
            entirely.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <article className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <FiSearch className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Find Clinic</h3>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Search for nearby clinics or specific specialists in our
                extensive network.
              </p>
            </article>

            <article className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-[#42b6de]">
                <FiCalendar className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Pick Slot</h3>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Choose a time that fits your schedule from the live availability
                calendar.
              </p>
            </article>

            <article className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                <RiTicket2Line className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Get Queue ID
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Receive a digital token and real-time updates on your wait
                status.
              </p>
            </article>

            <article className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                <FiShield className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Visit & Heal
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Arrive just in time for your turn. No more crowded waiting
                rooms!
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
