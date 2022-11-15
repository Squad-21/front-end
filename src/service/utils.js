export const formatDate = (date) => {
    const calendar = date.split('T')[0].split('-')
    let newDate = `${calendar[2]}/${calendar[1]}/${calendar[0].slice(2)}`

    return newDate
}

export const fileToBase = async(file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result)
        };
        reader.onerror = reject;
    })
}

export const calculateHoursOfLesson = (lessons) => {
    let time = {
        hours: 0,
        min: 0,
        sec: 0
    }

    if(!lessons || !lessons.length) return time
    
    const totalHours = lessons.map(lesson => Number(lesson.duration.split(':')[0])).reduce((acc, value) => acc + value, 0);
    const totalMin = lessons.map(lesson => Number(lesson.duration.split(':')[1])).reduce((acc, value) => acc + value, 0);
    const totalSec = lessons.map(lesson => Number(lesson.duration.split(':')[2])).reduce((acc, value) => acc + value, 0);

    time.hours = totalHours + Math.floor(totalMin / 60);
    time.min = (totalMin % 60) + Math.floor(totalSec / 60);
    time.sec = totalSec % 60;

    return time
}