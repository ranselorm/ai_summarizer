import { logo } from "../assets";
import { CirclesWithBar } from "react-loader-spinner";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full">
        <img
          src={logo}
          alt="sumz_logo"
          className="w-28 object-contain mb-10 pt-3"
        />
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/ranselorm/ai_summarizer.git")
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>

      <div className="mt-20">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    </header>
  );
};

export default Hero;
