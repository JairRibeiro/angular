import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from'@angular/router';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(private entryService: EntryService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService
             ) { }

  ngOnInit() 
  {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked()
  {
    this.setPageTitle();
  }

  submitForm()
  {
    this.submittingForm = true;

    if(this.currentAction == 'new')
    {
      this.createEntry();
    }
    else
    {
      this.updateEntry();
    }
  }

  // PRIVATE METHODS
  private setCurrentAction()
  {
    if(this.route.snapshot.url[0].path == 'new')
    {
      this.currentAction = 'new';
    }
    else
    {
      this.currentAction = 'edit';
    }
  }  

  private buildEntryForm()
  {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      categoryId: [null, Validators.required],
      paid: [null, Validators.required],
      date: [null, Validators.required],
      amount: [null, Validators.required],
      type: [null, Validators.required],
      description: [null]
    });
  }

  private loadEntry()
  {
    if(this.currentAction == 'edit')
    {
      this.route.paramMap
      .pipe
      (
        switchMap(params => this.entryService.getById(+params.get('id')))
      )
      .subscribe
      (
        (_entry) => {
          this.entry = _entry;
          this.entryForm.patchValue(this.entry);
        }, 
        error => {
          this.toastr.error(`Erro na base de dados: ${error}`);
        }
      );
    }
  }

  private setPageTitle()
  {
    if(this.currentAction == 'new')
    {      
      this.pageTitle = 'Cadastro de Novo Lançamento';
    }
    else
    {
      const entryName = this.entry.name || '';
      this.pageTitle = 'Editando Lançamento: ' + entryName;
    }
  }

  private createEntry()
  {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(entry)
        .subscribe
        (
          entry => this.actionsForSuccess(entry),
          error => this.actionsError(error)
        );
  }

  private updateEntry()
  {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry)
        .subscribe
        (
          entry => this.actionsForSuccess(entry),
          error => this.actionsError(error)
        );
  }

  private actionsForSuccess(entry: Entry)
  {
    this.toastr.success('Solicitação processada com sucesso');
    this.router.navigateByUrl('entries', {skipLocationChange: true})
               .then
               (
                 () => this.router.navigate(['entries', entry.id, 'edit'])
               );
  }

  private actionsError(error)
  {
    this.toastr.error('Ocorreu um erro ao processar sua solicitação!');
    this.submittingForm = false;

    if(error.status === 422)
    {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else
    {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }
  }

}
