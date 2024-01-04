import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'exatas':
        return 'calculate';

      case 'humanas':
        return 'menu book';
    }
    return 'calculate';
  }
}
