export class Communication {
    relevantId: string;
    personId: string;
    personName: string;
    sentTime: Date;
    content: string;

    constructor(
        relevantId: string,
        personId: string,
        personName: string,
        sentTime: Date,
        content: string) {
        this.relevantId = relevantId;
        this.personId = personId;
        this.personName = personName;
        this.sentTime = sentTime;
        this.content = content;
    }
}
