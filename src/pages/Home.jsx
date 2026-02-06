const Home = () => {
  const videos = Array(20).fill(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">
      {videos.map((v, i) => (
        <div key={i} className="hover:bg-gray-100 space-y-2 p-2">
          <div className="h-[70%] bg-black rounded-md"></div>
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-1">
              <h1 className="text-sm font-semibold">title</h1>
              <p className="text-xs text-gray-500">description</p>
            </div>
            <div className="ml-2">:</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home