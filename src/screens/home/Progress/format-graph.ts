import { Attempt, Session } from "../../../business-logic/api";
import { Palette } from "../../../design-system";

const getAverageEffort = (attempts: Attempt[]) => {

    let average = 0;

    for(let attempt of attempts) average += attempt.dificulty;
    if(attempts.length > 0) average /= attempts.length;

    return average;

}

const getBarColor = (attempts: Attempt[]) => {

    let color = Palette.grey.t600;
    let hardness = -1;

    for(let attempt of attempts) {
        if((attempt.route?.grade.hardness ?? -1) > hardness) {
            hardness = attempt.route!.grade.hardness;
            color = attempt.route!.grade.palette.t600;
        }
    }

    return color;

}

const FormatGraph = {

    ammount: {
        max: (sessions: Session[]) =>  Math.max(...sessions.map(s => s.attempts.length)),
        value: (session: Session, max: number ) => session.attempts.length/max,
        label: (session: Session) => String(session.attempts.length),
        barColor: getBarColor
    },

    duration: {
        max: (sessions: Session[]) =>  Math.max(...sessions.map(s => s.endTime.getTime() - s.startTime.getTime())),
        value: (session: Session, max: number ) => (session.endTime.getTime() - session.startTime.getTime())/max,
        label: (session: Session) => {
            const duration = session.endTime.getTime() - session.startTime.getTime();
            const hours = Math.floor(duration / (1000 * 60 * 60)); 
            const minutes = Math.floor(duration/ (1000 * 60)) % 60;

            return `${hours}:${String(minutes).padStart(2, '0')}`;
        },
        barColor: getBarColor
    },

    effort: {
        max: (sessions: Session[]) =>  Math.max(...sessions.map(s => getAverageEffort(s.attempts))),
        value: (session: Session, max: number ) => getAverageEffort(session.attempts)/max,
        label: (session: Session) => String(Math.round(getAverageEffort(session.attempts)*10)/10),
        barColor: getBarColor
    }

}

export default FormatGraph;