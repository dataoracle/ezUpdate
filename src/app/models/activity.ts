export class Activity {
    name: string;
    description: string;
    assigned_to: string;
    last_updated_on: number;
    last_updated_text: string;
    imageURL:string;
    updates = <any>[];
    isRead:any
    $key:string;

    constructor(name: string, description: string, assigned_to: string, imageURL: string) {
        this.name = name;
        this.description = description;
        this.assigned_to = assigned_to;
        this.last_updated_on = Date.now();
        this.last_updated_text = null;       
        this.imageURL = imageURL;
    }
    
    static withImage() {

        function random(min,max) {
            return Math.floor(Math.random() * (max-min) + min );
        }

        let  storage = firebase.storage();
        let imageName = 'pattern' + random(0,10) + '.png';
        let pathReference = storage.ref('placeholders/' + imageName);
        return pathReference.getDownloadURL()
    }

}
