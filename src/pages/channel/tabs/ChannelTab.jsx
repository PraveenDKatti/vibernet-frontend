import React, { useRef, useState } from "react";
import { UserRound } from 'lucide-react';
import { updateAccount, avatar, cover } from "../../../api/user.api";

export default function ChannelTab() {
  const [previews, setPreviews] = useState({
    cover: "",
    avatar: "",
  });
  const [links, setLinks] = useState([
    { title: "", url: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formRef = useRef(null);

  const handleFilePreview = (e) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0]);

      setPreviews((prev) => ({
        ...prev,
        [name]: previewUrl,
      }));
    }
  };

  const handleRemove = (field) => {
    setPreviews((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleAddLink = () => {
    setLinks((prev) => [...prev, { title: "", url: "" }]);
  };

  const handleRemoveLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index, field, value) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log(previews)
      const formData = new FormData(e.currentTarget);

      // Extract text fields
      const fullName = formData.get("fullName");
      const description = formData.get("description");
      const contactEmail = formData.get("contactEmail");

      // Update account details
      const accountData = {
        fullName,
        description,
        contactEmail,
        links: links.filter(link => link.title && link.url),
      };

      await updateAccount(accountData);

      // Upload cover image if selected
      if (formRef.current?.cover?.files?.[0]) {
        const coverFormData = new FormData();
        coverFormData.append("cover", formRef.current.cover.files[0]);
        await cover(coverFormData);
      }

      // Upload avatar if selected
      if (formRef.current?.avatar?.files?.[0]) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", formRef.current.avatar.files[0]);
        await avatar(avatarFormData);
      }

      setMessage("Channel settings updated successfully!");
      setPreviews({ cover: "", avatar: "" });
      setLinks([{ title: "", url: "" }]);
      formRef.current?.reset();

    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update channel settings");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="py-6 space-y-6 max-w-2xl"
    >
      <h2 className="text-xl font-semibold">Channel Settings</h2>

      {message && (
        <div className={`p-3 rounded-md ${message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      {/* COVER IMAGE */}
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-medium">Cover Image</p>
          <p className="text-sm text-gray-500">
            This image will appear across the top of your channel
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative h-35 w-full bg-zinc-100 rounded-lg overflow-hidden">
            {previews.cover && (
              <img
                src={previews.cover}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm">
              Use an image that's at least 2048 x 1152 pixels and 6MB or less.
            </p>

            <div className="relative inline-block mr-4 font-medium">
              <button type="button" className="px-3 py-2 bg-zinc-200 rounded-full">
                {previews.cover ? "Change" : "Upload"}
              </button>
              <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleFilePreview}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {previews.cover && (
              <button
                type="button"
                onClick={() => handleRemove("cover")}
                className="px-3 py-2 bg-zinc-200 rounded-full font-medium"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AVATAR */}
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-medium">Avatar</p>
          <p className="text-sm text-gray-500">
            Your avatar appears next to your videos and comments
          </p>
        </div>

        <div className="flex gap-4">
          <div className="w-full bg-zinc-100 h-35 rounded-lg flex items-center justify-center">
            <div className="relative h-30 w-30 overflow-hidden">
              {previews.avatar ? (
                <img
                  src={previews.avatar}
                  alt="Avatar Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-blue-200 flex items-center justify-center">
                  <UserRound
                    className="w-[90%] h-[90%] text-blue-500 fill-current stroke-none"
                  />
                </div>
              )
              }
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm">
              Use an image that's at least 98 x 98 pixels and 4MB or less.
            </p>

            <div className="relative inline-block mr-4 font-medium">
              <button type="button" className="px-3 py-2 bg-zinc-200 rounded-full">
                {previews.avatar ? "Change" : "Upload"}
              </button>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFilePreview}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {previews.avatar && (
              <button
                type="button"
                onClick={() => handleRemove("avatar")}
                className="px-3 py-2 bg-zinc-200 rounded-full font-medium"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FULL NAME */}
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          name="fullName"
          type="text"
          required
          placeholder="John Doe"
          className="mt-1 border rounded-md px-3 py-2 w-full"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <div>
          <label className="block text-sm font-medium">Description</label>
        </div>
        <textarea
          name="description"
          rows={4}
          placeholder="Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places."
          className="mt-1 border rounded-md px-3 py-2 w-full"
        />
      </div>

      {/* CONTACT EMAIL */}
      <div>
        <div>
          <label className="block text-sm font-medium">Contact Email</label>
          <p className="text-sm text-gray-500">
            Let people know how to contact you with business inquiries.
            The email address you enter may appear in the About section of your channel and be visible to viewers.
          </p>
        </div>
        <input
          name="contactEmail"
          type="email"
          placeholder="you@example.com"
          className="mt-1 border rounded-md px-3 py-2 w-full"
        />
      </div>

      {/* LINKS SECTION */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Links</label>
          <p className="text-sm text-gray-500">
            Share external links with your viewers. They'll be visible on your
            channel profile and about page.
          </p>
        </div>

        {links.map((link, index) => (
          <div key={index} className="grid grid-cols-5 gap-3 items-center">
            <input
              type="text"
              placeholder="Link Title (e.g. Instagram)"
              value={link.title}
              onChange={(e) =>
                handleLinkChange(index, "title", e.target.value)
              }
              className="border rounded-md px-3 py-2"
            />

            <input
              type="url"
              placeholder="https://example.com"
              value={link.url}
              onChange={(e) =>
                handleLinkChange(index, "url", e.target.value)
              }
              className="border col-span-3 rounded-md px-3 py-2"
            />

            <button
              type="button"
              onClick={() => handleRemoveLink(index)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddLink}
          className="text-blue-600 text-sm"
        >
          + Add Link
        </button>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-3 py-2 rounded-full disabled:opacity-50"
      >
        Save Changes
      </button>
    </form>
  );
}