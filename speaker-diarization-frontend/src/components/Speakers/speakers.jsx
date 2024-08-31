import React, {useState} from 'react';
import axios from '../../axios'

const SpeakersComponent = () => {
    const [speakers, setSpeakers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        if(!selectedFile) {
            console.error('No file selected');
        }
        const formData = new FormData();
        formData.append('audioFile', selectedFile);

        try {
            const response = await axios.post('/speakers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSpeakers(response.data.speakers);
            setAudioUrl(URL.createObjectURL(selectedFile));
        } catch (error) {
            console.error('Error fetching speakers:', error);
        }

    }

    return (
        <div>
            <h1>Speakers</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
            <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <ul>
                {speakers.map((speaker) => (
                    <li key={speaker.speakerId}>
                        <div>Speaker ID: {speaker.speakerId}</div>
                        <div>Segments:</div>
                        <ul>
                            {speaker.segments.map((segment, index) => (
                                <li key={index}>
                                    <div>Start Time: {segment.startTime}</div>
                                    <div>End Time: {segment.endTime}</div>
                                    <div>Content: {segment.content}</div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpeakersComponent;