import React from 'react'

export default function PollPost( {poll, setPoll}) {
    return (
        <div className="space-y-2">
            <input
                type="text"
                placeholder="Poll question"
                value={poll.question}
                onChange={(e) =>
                    setPoll({ ...poll, question: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
            />

            {poll.options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                        const updatedOptions = [...poll.options];
                        updatedOptions[index] = e.target.value;
                        setPoll({ ...poll, options: updatedOptions });
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                />
            ))}
        </div>
    )
}
