import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Matemática':
        return 'label';

      case 'Português':
        return 'label';

      case 'Biologia':
        return 'label';

      case 'Química':
        return ' label  ';

      case 'Física':
        return 'label';

      case 'História':
        return 'label';

      case 'Geografia':
        return 'label';

      case 'Artes':
        return 'label';
    }
    return 'label';
  }
}
