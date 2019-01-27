const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

class Database {
  constructor() {
    this.NOMDE_ARQUIVO = 'herois.json'
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOMDE_ARQUIVO, 'utf8');
    return JSON.parse(arquivo.toString());
  }

  escreverArquivo() {

  }

  async listar(id) {
    const dados = await this.obterDadosArquivo()
    return dados.filter(item => ( id ? (item.id === id) : true));
  }
}

module.exports = new Database();