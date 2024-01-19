export class NoSignedInAccount extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NoSignedInAccount';
    }
}
