const FeaturesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          How can we help your business?
        </h2>
        <p className="text-gray-600">
          When you resell besnik, you build trust and increase
        </p>
      </div>

      <div className="flex flex-col items-center p-6">
        <div className="w-full mb-6 flex items-center justify-center">
          <div className="w-full aspect-video max-w-3xl">
            <iframe
              width="100%"
              height="100%"
              className="rounded-xl"
              src=""
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <h3 className="text-2xl font-medium mb-3 text-center">
          Your Video Title Here
        </h3>

        <p className="text-gray-500 text-center max-w-xl">
          This is a short description about the video. You can use this space to
          add some engaging context or a call to action.
        </p>
      </div>

      <div className="text-center mt-12">
        <button
          className="bg-teal-600 text-white cursor-pointer px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors relative"
        >
          Become a Partner
          <div className="absolute -z-10 w-full h-full rounded-full bg-teal-600/30 blur-xl top-0 left-0"></div>
        </button>
      </div>
    </section>
  );
};

export default FeaturesSection;
