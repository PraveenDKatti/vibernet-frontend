export const formatDuration = (videoDuration)=> {
    
    if (!videoDuration || isNaN(videoDuration) || videoDuration < 0) {
        return "00:00";
    }

    const hours = Math.floor(videoDuration / 3600 )
    const minutes = Math.floor((videoDuration % 3600) / 60 )
    const seconds = Math.floor(videoDuration % 60 )

    if(!hours){
        return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
    }else{
        return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
    }
}
