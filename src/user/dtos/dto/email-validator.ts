import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAlhikmahEmail', async: false })
export class IsAlhikmahEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    return email?.endsWith('@alhikmah.edu.ng');
  }

  defaultMessage() {
    return 'Email must be from alhikmah.edu.ng domain';
  }
}

export function IsAlhikmahEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAlhikmahEmailConstraint,
    });
  };
}
