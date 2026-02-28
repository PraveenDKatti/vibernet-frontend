import React from 'react'
import { Image } from 'lucide-react'

export default function ImagePost({ images, handleImagePost }) {
    return (
        <div>
            {images.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-40 w-full border border-zinc-200 rounded-xl">
                    <div className="bg-blue-500 rounded-full p-2">
                        <Image size={22} className="text-white" />
                    </div>

                    <p className="mt-2">Drag up to 4 images or</p>

                    <label
                        htmlFor="image-file"
                        className="text-blue-500 font-medium cursor-pointer"
                    >
                        select file from your computer
                    </label>

                    <input
                        id="image-file"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImagePost}
                    />
                </div>
            ) : (
                /* If images exist → Show preview grid */
                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(img)}
                                alt="preview"
                                className="h-40 w-full object-cover rounded-xl"
                            />

                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={(e)=>handleImagePost(e,(prev) => prev.filter((_, i) => i !== index))}
                                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* Upload Card (shown if less than 4 images) */}
                    {images.length < 4 && (
                        <label
                            htmlFor="image-file"
                            className="flex items-center justify-center h-40 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50"
                        >
                            <span className="text-3xl text-zinc-400">+</span>

                            <input
                                id="image-file"
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleImagePost}
                            />
                        </label>
                    )}
                </div>
            )}
        </div>
    )
}
