import { Component, Directive, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'custom-input',
	templateUrl: './custom-input.component.html',
	styleUrls: ['./custom-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CustomInputComponent),
			multi: true,
		},
	],
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {
	@Input()
	formControl: FormControl;

	@Input()
	directive: Directive;

	@Input({ required: true })
	name: string;

	@Input({ required: true })
	type: 'text' | 'password';

	@Input({ required: true })
	placeholder: string = '';

	@Input()
	title: string = '';

	isPasswordType: boolean;
	passwordShow: boolean = false;
	value: string;
	onChange: (value: any) => void;
	onTouched: () => void;

	ngOnInit(): void {
		this.isPasswordType = this.type === 'password';
	}

	convertEvent(event: any) {
		this.onChange(event.target.value);
	}

	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {}

	togglePasswordShow() {
		this.type = this.type === 'password' ? 'text' : 'password';
		this.passwordShow = !this.passwordShow;
	}
}
