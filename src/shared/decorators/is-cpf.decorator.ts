import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          
          // Remove caracteres não numéricos
          const cpf = value.replace(/\D/g, '');
          
          // Verifica se tem 11 dígitos e não é uma sequência repetida
          if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
          
          // Validação dos dígitos verificadores
          const digits = cpf.split('').map(x => parseInt(x));
          const rest = (count: number) => (digits.slice(0, count-12)
            .reduce((sum, el, idx) => (sum + el * (count-idx)), 0) * 10) % 11 % 10;
          
          return rest(10) === digits[9] && rest(11) === digits[10];
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um CPF válido`;
        }
      }
    });
  };
}