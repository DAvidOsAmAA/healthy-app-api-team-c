import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsEqualTo(property: string) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage: () => 'Passwords do not match',
      },
    });
  };
}
