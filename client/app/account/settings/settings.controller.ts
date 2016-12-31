'use strict';
// @flow
interface User {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default class SettingsController {
  user: User = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {other: undefined};
  message = '';
  submitted = false;
  Auth;

  /*@ngInject*/
  constructor(Auth) {
    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}
