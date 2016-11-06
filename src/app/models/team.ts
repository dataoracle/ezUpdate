export class Team {
    created_on: number;
    name: string;    
    access = [];     
    is_private: boolean;

    constructor(text: string, creator_uid: string) {
        this.created_on = Date.now();
        this.name = text;
        this.access.push(creator_uid);        
        this.is_private = false;
    }
}