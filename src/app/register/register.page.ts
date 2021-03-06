import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	public registerForm: FormGroup;
	submitAttempt: boolean = false;
    regError: any = [];

	constructor(private auth: UserService, private formBuilder: FormBuilder, private loading: LoadingController, private route: Router) { 
		this.registerForm = formBuilder.group({
            email: ['', {validators: Validators.compose([Validators.required, Validators.email])}],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			username : ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			insecure: ['cool']
        });
	}
	nonce:any;

	ngOnInit() {
	}

	async register() {
		this.submitAttempt = true;
		this.regError = false;
		
		if(this.registerForm.valid) {
			this.registerForm.value.display_name = this.registerForm.value.username;
			const loader = await this.loading.create({
				message: 'Please wait...',
      			translucent: true,
			})

			await loader.present();

			let register = this.auth.register(this.registerForm.value).then((regdata:any) => {
				if(regdata.errors) {
					this.regError = regdata.errors
					console.log(this.regError);
					loader.dismiss()
				} else {
					loader.dismiss();

					this.route.navigateByUrl("/?reg_success=true");
				}
			})
		} else {
			
		}
	}

}
