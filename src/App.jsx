import { useState } from 'react';
import axios from 'axios';

function App() {
    const [title, setTitle] = useState('');
    const [outline, setOutline] = useState([]);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateOutline = async () => {
        if (!title.trim()) {
            alert('Please enter a blog title.');
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/generate-outline", { title });
            setOutline(response.data.outline);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const generateContent = async () => {
        if (outline.length === 0) {
            alert('Please generate the outline first.');
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/generate-content", { outline });
            setContent(response.data.content);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="text-3xl mb-10">Blog Generator</div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={generateOutline}
                    className="p-2 bg-blue-500 text-white rounded ml-2"
                >
                    Generate Outline
                </button>
            </div>

            {loading && <p>Loading...</p>}

            {outline.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-4xl font-semibold">Outline:</h2>
                    <ul className="list-disc ml-6">
                        {outline.map((heading, index) => (
                            <li key={index}>{heading}</li>
                        ))}
                    </ul>
                    <button
                        onClick={generateContent}
                        className="mt-2 p-2 bg-green-500 text-white rounded"
                    >
                        Generate Content
                    </button>
                </div>
            )}

            {content.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold">Generated Article</h2>
                    {content.map((section, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-bold">{outline[index]}</h3>
                            <p>{section}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
