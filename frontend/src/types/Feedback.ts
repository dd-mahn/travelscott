/**
 * Interface representing feedback data.
 */
export interface Feedback {
    /**
     * The name of the person providing feedback.
     */
    name: string;

    /**
     * The email of the person providing feedback.
     */
    email: string;

    /**
     * The feedback message.
     */
    feedback: string;
}