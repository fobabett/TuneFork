import { Control, FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LinkValidator } from './link-validator';

export class FromControl implements OnInit {
	track: Control;
	form: ControlGroup;

	constructor(private builder: FormBuilder) {}

	ngOnInit() {
		this.track = new Control('', Validators.compose([Validators.required, LinkValidator.validUrl]));
		this.form = this.builder.group({
			track: this.track
		});
	}
};