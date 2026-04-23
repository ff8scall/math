import LZString from 'lz-string';

const SYNC_PARAM = 's';

/**
 * 상태 객체를 압축된 URL 파라미터 문자열로 변환
 */
export const encodeState = (state) => {
    try {
        const jsonString = JSON.stringify(state);
        return LZString.compressToEncodedURIComponent(jsonString);
    } catch (e) {
        console.error('Failed to encode state', e);
        return null;
    }
};

/**
 * 압축된 URL 파라미터 문자열을 상태 객체로 복원
 */
export const decodeState = (encoded) => {
    try {
        const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
        if (!decompressed) return null;
        return JSON.parse(decompressed);
    } catch (e) {
        console.error('Failed to decode state', e);
        return null;
    }
};

/**
 * 현재 URL에서 상태를 읽어옴
 */
export const getStateFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get(SYNC_PARAM);
    if (!encoded) return null;
    return decodeState(encoded);
};

/**
 * URL에 상태를 주입 (기존 URL 히스토리를 유지하며 갱신)
 */
export const updateUrlWithState = (state) => {
    const encoded = encodeState(state);
    if (!encoded) return;

    const url = new URL(window.location.href);
    url.searchParams.set(SYNC_PARAM, encoded);
    
    // 브라우저 히스토리에 너무 많은 항목이 남지 않도록 replaceState 사용
    window.history.replaceState(null, '', url.toString());
};
