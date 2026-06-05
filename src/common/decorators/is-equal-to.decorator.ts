import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsEqualTo(property: string) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as string[];
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ];
          return value === relatedValue;
        },
        defaultMessage: () => 'Passwords do not match',
      },
    });
  };
}
