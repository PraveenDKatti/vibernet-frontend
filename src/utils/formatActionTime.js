import { formatDistanceToNow } from "date-fns";

export const formatActionTime = (actionTime) => {
    if (!actionTime) return "";
    try {
        const date = new Date(actionTime);
        if (isNaN(date.getTime())) return "";
        return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
        console.error("Error formatting action time:", error);
        return "";
    }
};