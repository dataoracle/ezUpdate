import {Pipe, PipeTransform} from '@angular/core'
import * as moment from 'moment';

@Pipe({
    name:'ageFormat',
    pure:false
})

export class AgeFormatPipe implements PipeTransform {
    transform(createdOn:number): string {
        return moment(createdOn).fromNow();
    }
}