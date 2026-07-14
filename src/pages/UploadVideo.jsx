import React, { useState } from 'react'
import { X, ArrowUpFromLine, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { publishVideo } from '../api/video.api'
import useAuthStore from '../store/authStore'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'

const STEPS = ["Video Info", "Elements", "Privacy", "Overview"]

export default function UploadVideo() {
    const [videoFile, setVideoFile] = useState(null)
    const [currentStep, setCurrentStep] = useState(0) // Tracks progressive step (0 to 3)

    // Form Inputs State
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [privacy, setPrivacy] = useState("private")

    const navigate = useNavigate()
    const { user } = useAuthStore()

    const fetchFile = (e) => {
        const doc = e.target.files[0]
        if (doc) {
            setVideoFile(doc)
            setCurrentStep(0) // Default to first step when a file is successfully uploaded
        }
    }

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const uploadVideo = async () => {
        const formData = new FormData();
        formData.append('videoFile', videoFile);
        formData.append('title', title || '');
        formData.append('description', description || '');
        formData.append('privacy', privacy);

        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        const success = await publishVideo(formData);

        if (success) {
            navigate(`/${user.username}/videos`);
        }
    }
    const handleClose = () => {
        navigate('/')
    }

    return (
        <div className='h-screen bg-black/40 fixed inset-0 z-50 flex items-center justify-center text-zinc-900 p-2 sm:p-4'>
            <div className='w-[96vw] md:w-[75vw] h-[96vh] md:h-[85vh] rounded-2xl md:rounded-3xl bg-white flex flex-col overflow-hidden shadow-2xl'>

                {/* Header Row */}
                <div className='flex items-center justify-between py-4 px-6 border-b border-gray-200'>
                    <span className='text-lg md:text-xl font-bold truncate max-w-[80%]'>
                        {videoFile ? (videoFile.name.length > 30 ? `${videoFile.name.substring(0, 30)}...` : videoFile.name) : "Upload Videos"}
                    </span>
                    <X size={22} className="cursor-pointer hover:text-red-500 transition-colors shrink-0" onClick={handleClose} />
                </div>

                {/* Progressive Stepper UI Header */}
                {videoFile && (
                    <div className='flex items-center justify-between px-4 md:px-16 py-4 bg-zinc-50 border-b border-gray-200 select-none'>
                        {STEPS.map((step, index) => (
                            <React.Fragment key={step}>
                                <div className='flex items-center space-x-2 md:space-x-3'>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-300 shrink-0
                                        ${index < currentStep ? 'bg-black border-black text-white' :
                                            index === currentStep ? 'border-black text-black ring-4 ring-black/10' : 'border-gray-300 text-gray-400'}`}
                                    >
                                        {index < currentStep ? <Check size={14} strokeWidth={3} /> : index + 1}
                                    </div>
                                    <span className={`text-xs md:text-sm font-medium transition-colors duration-300 hidden sm:inline-block ${index === currentStep ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                        {step}
                                    </span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div className={`flex-1 h-[2px] mx-2 md:mx-4 transition-all duration-500 ${index < currentStep ? 'bg-black' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {/* Main Dynamic View Content */}
                <div className='flex-1 overflow-y-auto p-6'>
                    {!videoFile ? (
                        /* STEP 0: Initial File Drop UI */
                        <div className='grid place-items-center h-full max-w-2xl mx-auto text-center'>
                            <div className="flex flex-col items-center justify-center animate-fadeIn" >
                                <label className='cursor-pointer relative group w-32 h-32 rounded-full grid place-items-center text-black/50 bg-zinc-100 my-5 hover:bg-zinc-200 transition-colors'>
                                    <ArrowUpFromLine className='w-10 h-10 text-gray-600 group-hover:scale-110 transition-transform' />
                                    <input type="file" accept='video/*' onChange={fetchFile} className="hidden" />
                                </label>
                            </div>
                            <p className='font-medium text-lg text-zinc-700'>Drag and drop video files to upload</p>
                            <p className='text-sm text-gray-500 mt-1'>Your videos will be private until you publish them.</p>

                            <label className='cursor-pointer inline-block text-white font-semibold text-sm bg-black rounded-full my-8 px-6 py-2.5 hover:bg-zinc-800 transition-colors'>
                                Select files
                                <input type="file" accept='video/*' onChange={fetchFile} className="hidden" />
                            </label>

                            <p className='text-xs text-gray-400 max-w-lg leading-relaxed'>
                                By submitting your videos, you acknowledge that you agree to our Terms of Service and Community Guidelines. Please be sure not to violate others' copyright or privacy rights.
                            </p>
                        </div>
                    ) : (
                        /* STEP 1-4: Sequential Multi-step Setup Subforms */
                        <div className='h-full max-w-4xl mx-auto py-4'>
                            {currentStep === 0 && (
                                <div className='space-y-5 animate-fadeIn'>
                                    <h3 className='text-lg font-bold text-zinc-800'>Details</h3>

                                    <Input
                                        label="Title (required)"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Add a title that describes your video"
                                    />

                                    <Textarea
                                        label="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Tell viewers about your video"
                                        rows={4}
                                    />

                                    <div className='flex flex-col space-y-1.5'>
                                        <label className='text-xs font-semibold text-zinc-500 uppercase tracking-wider'>Thumbnail</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setThumbnail(e.target.files[0])}
                                            className='text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-150 file:text-black hover:file:bg-zinc-200 cursor-pointer'
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className='space-y-4 animate-fadeIn'>
                                    <h3 className='text-lg font-bold text-zinc-800'>Video Elements</h3>
                                    <p className='text-sm text-gray-500'>Use cards and an end screen to show viewers related videos, websites, and calls to action.</p>
                                    <div className='border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400 text-sm bg-zinc-50'>
                                        Optional configuration configuration hooks can go here (e.g., Subtitles, End Screens, Cards).
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className='space-y-4 animate-fadeIn'>
                                    <h3 className='text-lg font-bold text-zinc-800'>Privacy & Visibility</h3>
                                    <p className='text-sm text-gray-500'>Choose when to publish and who can see your video.</p>
                                    <div className='border border-gray-200 rounded-xl p-5 bg-zinc-50 space-y-4 max-w-md'>
                                        {['private', 'unlisted', 'public'].map((option) => (
                                            <label key={option} className='flex items-center space-x-3 cursor-pointer capitalize font-medium text-sm text-zinc-700'>
                                                <input type="radio" name="privacy" value={option} checked={privacy === option} onChange={(e) => setPrivacy(e.target.value)} className='w-4 h-4 accent-black' />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className='space-y-5 animate-fadeIn'>
                                    <h3 className='text-lg font-bold text-zinc-800'>Overview & Review</h3>
                                    <p className='text-sm text-gray-500'>Check your configuration settings before final upload publishing.</p>
                                    <div className='bg-zinc-50 border border-gray-200 rounded-xl p-6 space-y-3 text-sm'>
                                        <p><strong>File Name:</strong> {videoFile?.name}</p>
                                        <p><strong>Title:</strong> {title || <span className="text-red-400 italic">No Title provided</span>}</p>
                                        <p><strong>Description:</strong> {description || <span className="text-gray-400 italic">No description provided</span>}</p>
                                        <p><strong>Thumbnail chosen:</strong> {thumbnail ? thumbnail.name : "None selected"}</p>
                                        <p className="capitalize"><strong>Visibility:</strong> {privacy}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sticky Progress Control Footer Block */}
                {videoFile && (
                    <div className='flex items-center justify-between px-6 py-4 bg-zinc-50 border-t border-gray-200'>
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                        >
                            Back
                        </Button>

                        {currentStep < STEPS.length - 1 ? (
                            <Button
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                onClick={uploadVideo}
                                variant="primary"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                            >
                                Publish Video
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
