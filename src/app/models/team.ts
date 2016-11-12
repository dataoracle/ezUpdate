export class Team {
    created_on: number;
    created_by: string;
    name: string;    
    access = [];     
    is_private: boolean;
    $key: string;
    

    constructor(text: string, creator_uid: string) {
        this.created_on = Date.now();
        this.name = text;
        this.access.push(creator_uid);        
        this.is_private = false;
        this.created_by = creator_uid;
    }
}