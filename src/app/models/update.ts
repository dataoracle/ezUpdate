export class Update {
    createdBy: string;
    createdOn:number;
    updateText:String;

    constructor(createdBy: string, updateText:string) {
        this.createdBy = createdBy;
        this.updateText = updateText;
        this.createdOn = Date.now();
    }
}