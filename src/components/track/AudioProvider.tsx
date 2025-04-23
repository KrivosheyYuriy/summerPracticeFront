import React, { createContext, useState, useContext } from 'react';

interface AudioContextProps {
    currentPlayingUrl: string | null;
    setCurrentPlayingUrl: (url: string | null) => void;
    pauseCurrentAudio: () => void;
}

const AudioContext = createContext<AudioContextProps>({
    currentPlayingUrl: null,
    setCurrentPlayingUrl: () => {},
    pauseCurrentAudio: () => {},
});

export const useAudio = () => useContext(AudioContext);

interface AudioProviderProps {
    children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string | null>(null);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

    const pauseCurrentAudio = () => {
        if (audioElement) {
            audioElement.pause();
        }
    };


    const contextValue: AudioContextProps = {
        currentPlayingUrl,
        setCurrentPlayingUrl: (url) => {
            if (audioElement) {
                audioElement.pause();
            }
            setCurrentPlayingUrl(url);
        },
        pauseCurrentAudio
    };


    return (
        <AudioContext.Provider value={contextValue}>
            {children}
        </AudioContext.Provider>
    );
};