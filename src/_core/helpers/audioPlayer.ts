import confirmAudio from '../../assets/audio/confirm.mp3';
import bellAudio from '../../assets/audio/bell.wav';
import moneyAudio from '../../assets/audio/money.wav';
import pop1Audio from '../../assets/audio/pop-1.wav';
import pop2Audio from '../../assets/audio/pop-2.wav';
import error from '../../assets/audio/error1.mp3';
import open from '../../assets/audio/open.mp3';
import success from '../../assets/audio/success.mp3';

type TypeAudio = {
    bell: string;
    confirm: string;
    money: string;
    error: string;
    open: string;
    success: string;
    pop1: string;
    pop2: string;
};

/**
 * PLAY AUDIO SOURCE ALERT
 * @param {string} typeAudio 'bell', 'confirm', 'money', 'error', 'open', 'success', 'pop1', 'pop2'
 * @param {number} volume 0 to 1
 */
export const audioPlayer = <P extends keyof TypeAudio>(typeAudio: P, volume?: number) => {
    const audio = new Audio();
    audio.src =
       typeAudio === 'bell' ? bellAudio :
       typeAudio === 'confirm' ? confirmAudio :
       typeAudio === 'money' ? moneyAudio :
       typeAudio === 'error' ? error :
       typeAudio === 'open' ? open :
       typeAudio === 'success' ? success :
       typeAudio === 'pop1' ? pop1Audio :
       typeAudio === 'pop2' ? pop2Audio : '' ;
    audio.load();
    audio.volume = volume || 0.5;
    audio.play();
};
