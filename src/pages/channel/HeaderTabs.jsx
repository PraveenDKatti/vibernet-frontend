export default function HeaderTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="">
      <div className="flex px-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`p-3 text-sm font-medium transition ${
              activeTab === tab.key
                ? "text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
