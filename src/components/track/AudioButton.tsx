import React, { useState, useRef, useCallback } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { styled } from '@mui/system';
import axios from 'axios';

interface AudioButtonProps {
    audioUrl: string; // URL для запроса аудиофайла на сервере
}

const StyledIconButton = styled(IconButton)({
    // Стили для кнопки (по желанию)
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)', // Пример эффекта при наведении
    },
});

const AudioButton: React.FC<AudioButtonProps> = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);

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
            if (audioUrl !== currentAudioUrl) {
                try {
                    const response = await axios.get(audioUrl, {
                        responseType: 'blob',
                    });
                    const audioBlob = response.data;
                    const audioObjectURL = URL.createObjectURL(audioBlob);

                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.removeAttribute('src'); // Очищаем src
                        audioRef.current.load();
                    }

                    if (!audioRef.current) {
                        audioRef.current = new Audio();
                    }

                    audioRef.current.src = audioObjectURL;
                    setCurrentAudioUrl(audioUrl);
                    await audioRef.current.play();
                    setIsPlaying(true);

                    audioRef.current.addEventListener('ended', () => {
                        setIsPlaying(false);
                    });

                } catch (error) {
                    console.error("Ошибка загрузки аудио:", error);
                    setIsPlaying(false);
                }
            } else {
                // Если URL тот же, просто продолжаем воспроизведение
                if (audioRef.current) {
                    try {
                        await audioRef.current.play(); // Пытаемся возобновить воспроизведение
                        setIsPlaying(true);
                    } catch (error) {
                        console.error("Ошибка возобновления воспроизведения:", error);
                        setIsPlaying(false);
                    }
                }
            }
        }
    }, [isPlaying, audioUrl, currentAudioUrl]);


    return (
        <StyledIconButton aria-label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </StyledIconButton>
    );
};

export default AudioButton;