import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
    console.log(course);
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl],
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this._snackBar.open('Salvo com sucesso!', '', { duration: 4000 });
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar curso', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName); //Abstract control

    if (field?.hasError('required')) {
      return 'Preencha o campo obrigatório';
    }

    if (field?.hasError('minlenght')) {
      const requiredLenght: number = field.errors
        ? field.errors['minlenght']['requieredLenght'] //se o erro existe obterei o erro e me mostrara o tamanho requerido caso nao tenha retornara 5
        : 5;
      return `O tamanho mínimo precisa ser de ${requiredLenght} caracteres`;
    }

    if (field?.hasError('maxlenght')) {
      const requiredLenght: number = field.errors
        ? field.errors['maxlenght']['requieredLenght'] //se o erro existe obterei o erro e me mostrara o tamanho requerido caso nao tenha retornara 5
        : 100;
      return `O tamanho máximo é de  ${requiredLenght} caracteres`;
    }

    return 'Campo Inválido';
  }
}
