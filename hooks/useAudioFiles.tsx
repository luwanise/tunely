import { useEffect, useState } from "react";
import { getAudioFiles } from "@/utils/getAudioFiles";
import { Audio } from "@/models/Audio";
import { processAudioFiles } from "@/utils/processAudioFiles";

export function useAudioFiles() {
    const [audioFiles, setAudioFiles] = useState<Audio[]>()

    useEffect(() => {
        const loadAudioFiles = async () => {
            const files = await getAudioFiles();
            setAudioFiles(processAudioFiles(files));
        }
        
        loadAudioFiles();
    }, []);

    return audioFiles;
}