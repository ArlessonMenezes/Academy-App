export class CpfHelper {
  /**
   * Formata e valida o CPF
   * @param cpf Número do CPF (com ou sem formatação)
   * @returns CPF formatado ou lança exceção se inválido
   */

  static formatAndValidate(cpf: string) {
    if (!cpf) throw new Error('CPF não fornecido');

    // Remove todos os caracteres não numéricos
    const cleanCpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cleanCpf.length !== 11) {
      throw new Error('CPF deve conter 11 dígitos');
    }

    // Valida o CPF usando o algoritimo oficial
    if (!this.validate(cleanCpf)) {
      throw new Error('CPF inválido');
    }

    return cleanCpf;
  }

  /**
   * Valida o CPF usando o algoritmo oficial
   * @param cpf Número do CPF (apenas dígitos)
   * @returns true se válido, false se inválido
   */

  private static validate(cpf: string): boolean {
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    
    const cpfDigits = cpf.split('').map(x => parseInt(x));
    const rest = (count: number) => (cpfDigits.slice(0, count-12)
      .reduce((sum, el, idx) => (sum + el * (count-idx)), 0) * 10) % 11 % 10;
    
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }

   /**
    * Formata o CPF para exibição (xxx.xxx.xxx-xx)
    * @param cpf Número do CPF (com ou sem formatação)
    * @returns CPF formatado
    */

  static formatForDisplay(cpf: string): string {
    const cleanedCpf = cpf.replace(/\D/g, '');
    return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}