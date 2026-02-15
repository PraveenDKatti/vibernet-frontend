import React from "react";

export default function HomeTab() {
  return (
    <div className="px-10 py-6 space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Video</h2>
        <div className="bg-gray-100 h-60 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">Featured video preview</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-2">
              <div className="bg-gray-200 h-40 rounded-xl"></div>
              <p className="font-medium">Video Title {item}</p>
              <p className="text-sm text-gray-500">10K views • 2 days ago</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
