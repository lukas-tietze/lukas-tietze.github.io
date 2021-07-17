import { fromEvent } from 'rxjs';

fromEvent(document, 'load').subscribe(() => console.log('loaded!'));
