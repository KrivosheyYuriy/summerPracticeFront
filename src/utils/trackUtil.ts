import {Track} from "../api/tracks/Track";
import {getComposerById} from "../api/composers/composerApi.ts";


export const createComposerNameMap = async (data: Track[] | undefined):
    Promise<{[composerId: number]: string}> => {

    if (!data) {
        return {}; // Или другое значение по умолчанию, если data null
    }

    const allComposerIds = new Set<number>();
    data.forEach(track => {
        track.composersId.forEach(id => allComposerIds.add(id));
    });

    const composerIdArray = Array.from(allComposerIds);

    const results = await Promise.all(composerIdArray.map(async composerId => {
        try {
            const composer = await getComposerById(composerId);
            return { id: composerId, composer };
        } catch (error) {
            console.error(`Error fetching composer ${composerId}:`, error);
            return { id: composerId, composer: null };
        }
    }));

    const newMap: { [composerId: number]: string } = {};
    results.forEach(({ id, composer }) => {
        if (composer) {
            newMap[id] = `${composer.surname} ${composer.name} ${composer.fatherName}`;
        } else {
            newMap[id] = "Unknown Composer";
        }
    });

    return newMap;
};