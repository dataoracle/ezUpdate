export class Activity {
    name: string;
    description: string;
    assigned_to: string;
    last_updated_on: number;
    last_updated_text: string;
    updates = <any>[];

    constructor(name: string, description: string, assigned_to: string) {
        this.name = name;
        this.description = description;
        this.assigned_to = assigned_to;
        this.last_updated_on = Date.now();
        this.last_updated_text = null;
    }
}
