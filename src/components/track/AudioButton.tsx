import React, {useCallback, useEffect, useRef, useState} from 'react';
import {IconButton} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {styled} from '@mui/system';
import axios from 'axios';
import {useAudio} from "./AudioProvider.tsx";

interface AudioButtonProps {
    audioUrl: string;
}

const StyledIconButton = styled(IconButton)({
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
});

const AudioButton: React.FC<AudioButtonProps> = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { currentPlayingUrl, setCurrentPlayingUrl } = useAudio();

    useEffect(() => {
        if (currentPlayingUrl !== audioUrl && isPlaying) {
            setIsPlaying(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [currentPlayingUrl, audioUrl, isPlaying]);



    const togglePlay = useCallback(async () => {
        if (!audioUrl) {
            console.warn("URL аудио не предоставлен");
            return;
        }

        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setIsPlaying(false);
        } else {
            if (currentPlayingUrl !== audioUrl) {
                try {
                    // Загрузка нового аудио
                    const response = await axios.get(audioUrl, {
                        responseType: 'blob',
                    });
                    const audioBlob = response.data;
                    const audioObjectURL = URL.createObjectURL(audioBlob);

                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.removeAttribute('src');
                        audioRef.current.load();
                    }

                    audioRef.current = new Audio(audioObjectURL);
                    audioRef.current.addEventListener('ended', () => {
                        setIsPlaying(false);
                        setCurrentPlayingUrl(null);
                    });
                    await audioRef.current.play();

                    setCurrentPlayingUrl(audioUrl);
                    setIsPlaying(true);

                } catch (error) {
                    console.error("Ошибка загрузки аудио:", error);
                    setIsPlaying(false);
                }
            } else {
                // Возобновляем воспроизведение
                try {
                    await audioRef.current?.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.error("Ошибка возобновления воспроизведения:", error);
                    setIsPlaying(false);
                }
            }
        }
    }, [isPlaying, audioUrl, currentPlayingUrl, setCurrentPlayingUrl]);

    return (
        <StyledIconButton aria-label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </StyledIconButton>
    );
};

export default AudioButton;