import axios from 'axios';
import _ from 'lodash';

/**
 * Criando a requisição para API com as configs
 * @type {AxiosInstance}
 */
const api = axios.create({
  // baseUrl: !!process.env.REACT_APP_API_URL
  //   ? process.env.REACT_APP_API_URL
  //   : '/',
  baseURL: 'http://localhost:3001',

  transformResponse: [
    (response) => {
      let resp;

      try {
        resp = JSON.parse(response);
      } catch (error) {
        throw Error(response);
      }

      return resp;
    },
  ],
});

/**
 *  Objeto usado para fazer o consumo padrão dos serviços.
 */
const genericService = {
  HOST: 'http://localhost:3001',

  USER_TOKEN:
    window.localStorage.getItem('token') !== ''
      ? window.localStorage.getItem('token')
      : null,

  /**
   * Cabeçalhos padrões enviados em todas as requisições.
   *
   * Sempre que o usuário efetuar login o token do mesmo será
   * enviado em todas as furuas requisições.
   *
   * @return Object
   */
  HEADERS: function () {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '/',
    };

    return headers;
  },

  /**
   * Função responsável por fazer requisições do tipo post.
   *
   * @param { String } route Caminho da requisição.
   * @param { Object } data (Opcional) Dados que serão enviados.
   * @param { Object } hearders (Opcional) Configurações ou informações adicionais
   */
  post: function (route, data = {}, hearders = {}) {
    //_.merge(hearders, { "Content-Type": "application/json" })

    return api.post(this.HOST + route, data, {
      headers: _.merge(this.HEADERS(), hearders),
    });
  },

  /**
   * Função responsável por fazer requisições do tipo get.
   *
   * @param { String } route Caminho da requisição.
   * @param { Object } data (Opcional) Dados que serão enviados.
   * @param { Object } hearders (Opcional) Configurações ou informações adicionais
   */
  get: function (route, data = {}, hearders = {}) {
    if (typeof data === 'string') {
      return api.get(this.HOST + route + data, {
        headers: _.merge(this.HEADERS(), hearders),
      });
    } else {
      return api.get(
        this.HOST + route,
        { params: data },
        {
          headers: _.merge(this.HEADERS(), hearders),
        },
      );
    }
  },

  /**
   * Função responsável por fazer requisições do tipo delete.
   *
   * @param { String } route Caminho da requisição.
   * @param { Object } data (Opcional) Dados que serão enviados.
   * @param { Object } hearders (Opcional) Configurações ou informações adicionais
   */
  delete: function (route, data = {}, hearders = {}) {
    return api.delete(
      this.HOST + route,
      { data: data },
      {
        headers: _.merge(this.HEADERS(), hearders),
      },
    );
  },

  /**
   * Função responsável por fazer requisições do tipo put.
   *
   * @param { String } route Caminho da requisição.
   * @param { Object } data (Opcional) Dados que serão enviados.
   * @param { Object } hearders (Opcional) Configurações ou informações adicionais
   */
  put: function (route, data = {}, hearders = {}) {
    return api.put(this.HOST + route, data, {
      headers: _.merge(this.HEADERS(), hearders),
    });
  },

  /**
   * Função responsável por fazer requisições do tipo patch.
   *
   * @param { String } route Caminho da requisição.
   * @param { Object } data Dados que serão enviados.
   * @param { Object } hearders (Opcional) Configurações ou informações adicionais
   */
  patch: function (route, data, hearders = {}) {
    return api.patch(
      this.HOST + route,
      data,
      _.merge(this.HEADERS(), hearders),
    );
  },
};

export default genericService;
