import React from "react";

export default function ChannelTab() {
  return (
    <div className="px-10 py-6 space-y-6">
      <h2 className="text-xl font-semibold">Channel Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Channel Name</label>
          <input
            type="text"
            className="mt-1 border rounded-md px-3 py-2 w-full"
            placeholder="Enter channel name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 border rounded-md px-3 py-2 w-full"
            rows="4"
            placeholder="Write something about your channel..."
          ></textarea>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}
