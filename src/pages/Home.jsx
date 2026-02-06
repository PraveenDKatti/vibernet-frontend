const Home = () => {
  const videos = Array(20).fill(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map(v => (
        <div key={v.id}>{v.title}</div>
      ))}
    </div>
  );
};

export default Home